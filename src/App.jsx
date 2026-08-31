import { useEffect, useRef, useState } from 'react'

function MathHeroViz() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6)
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    let t = 0
    const draw = () => {
      const w = canvas.getBoundingClientRect().width
      const h = canvas.getBoundingClientRect().height
      ctx.clearRect(0, 0, w, h)
      // grid
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.lineWidth = 1
      for (let x = 0; x < w; x += 24) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += 24) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
      // 3D wave surface projection (isometric)
      const cols = 28, rows = 18
      const scale = Math.min(w, h) * 0.32
      const cx = w * 0.5, cy = h * 0.52
      t += 0.015
      // draw surface as wireframe
      for (let r = 0; r < rows; r++) {
        ctx.beginPath()
        for (let c = 0; c < cols; c++) {
          const x = (c / (cols - 1) - 0.5) * 2
          const y = (r / (rows - 1) - 0.5) * 2
          // mathematic function: z = sin(x*2 + t) * cos(y*2 + t*0.7) * 0.6
          const z = Math.sin(x * 2.2 + t) * Math.cos(y * 2.0 + t * 0.7) * 0.55
          // isometric projection
          const isoX = (x - y) * scale * 0.55
          const isoY = (x + y) * scale * 0.28 - z * scale * 0.55
          const px = cx + isoX
          const py = cy + isoY
          if (c === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.strokeStyle = r % 2 === 0 ? 'rgba(201,168,106,0.22)' : 'rgba(0,217,255,0.18)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
      for (let c = 0; c < cols; c++) {
        ctx.beginPath()
        for (let r = 0; r < rows; r++) {
          const x = (c / (cols - 1) - 0.5) * 2
          const y = (r / (rows - 1) - 0.5) * 2
          const z = Math.sin(x * 2.2 + t) * Math.cos(y * 2.0 + t * 0.7) * 0.55
          const isoX = (x - y) * scale * 0.55
          const isoY = (x + y) * scale * 0.28 - z * scale * 0.55
          const px = cx + isoX
          const py = cy + isoY
          if (r === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.06)'
        ctx.stroke()
      }
      // highlight peak
      const peakX = Math.sin(t) * 0.3
      const peakY = Math.cos(t * 0.7) * 0.25
      const peakZ = Math.sin(peakX * 2.2 + t) * Math.cos(peakY * 2 + t * 0.7) * 0.55
      const isoPX = (peakX - peakY) * scale * 0.55
      const isoPY = (peakX + peakY) * scale * 0.28 - peakZ * scale * 0.55
      ctx.fillStyle = '#FFD60A'
      ctx.shadowBlur = 12
      ctx.shadowColor = 'rgba(255,214,10,0.6)'
      ctx.beginPath()
      ctx.arc(cx + isoPX, cy + isoPY, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      // subtle label
      ctx.fillStyle = 'rgba(201,168,106,0.0)'
      ctx.font = '11px JetBrains Mono'
      ctx.fillText('', 10, h - 14)
      ctx.fillStyle = 'rgba(255,255,255,0.0)'
      ctx.fillText('', w - 132, h - 14)

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ width: '100%', height: '220px', display: 'block' }} />
}

function GradientDescentViz() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6)
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      canvas.width = r.width * dpr
      canvas.height = r.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    let step = 0
    const path = []
    // simple quadratic loss: f(x,y) = (x-0.3)^2 + 2*(y+0.2)^2
    let x = -0.8, y = 0.7
    const draw = () => {
      const w = canvas.getBoundingClientRect().width
      const h = canvas.getBoundingClientRect().height
      ctx.clearRect(0, 0, w, h)
      // contour
      for (let i = 0; i < 7; i++) {
        const level = (i + 1) * 0.12
        ctx.strokeStyle = `rgba(201,168,106,${0.07 + i * 0.02})`
        ctx.lineWidth = 1
        ctx.beginPath()
        for (let a = 0; a <= Math.PI * 2; a += 0.02) {
          const rx = Math.sqrt(level) * 1.1
          const ry = Math.sqrt(level / 2) * 1.0
          const px = w * 0.5 + Math.cos(a) * rx * w * 0.32
          const py = h * 0.5 + Math.sin(a) * ry * h * 0.42
          if (a === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.stroke()
      }
      // gradient steps
      if (step < 42) {
        const lr = 0.18
        const gx = 2 * (x - 0.3)
        const gy = 4 * (y + 0.2)
        x -= lr * gx
        y -= lr * gy
        path.push({ x, y })
        if (path.length > 28) path.shift()
        step++
      } else if (Math.random() < 0.02) {
        // reset
        x = -0.8 + Math.random() * 0.3
        y = 0.7 - Math.random() * 0.3
        path.length = 0
        step = 0
      }
      // draw path
      ctx.strokeStyle = 'rgba(0,217,255,0.75)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      path.forEach((p, i) => {
        const px = w * 0.5 + p.x * w * 0.32
        const py = h * 0.5 + p.y * h * 0.42
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      })
      ctx.stroke()
      // current point
      if (path.length) {
        const last = path[path.length - 1]
        const px = w * 0.5 + last.x * w * 0.32
        const py = h * 0.5 + last.y * h * 0.42
        ctx.fillStyle = '#FFD60A'
        ctx.shadowBlur = 10
        ctx.shadowColor = 'rgba(255,214,10,0.5)'
        ctx.beginPath()
        ctx.arc(px, py, 3.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
        // optimum
        ctx.fillStyle = 'rgba(255,0,51,0.9)'
        ctx.beginPath()
        ctx.arc(w * 0.5 + 0.3 * w * 0.32, h * 0.5 - 0.2 * h * 0.42, 2.5, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.fillStyle = 'rgba(255,255,255,0.45)'
      ctx.font = '10px JetBrains Mono'
      ctx.fillText('∇f → optimum', 8, h - 10)
      ctx.fillStyle = 'rgba(201,168,106,0.9)'
      ctx.fillText(`step ${step}`, w - 52, 14)
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ width: '100%', height: '220px', display: 'block' }} />
}

function MatrixViz() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6)
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      canvas.width = r.width * dpr
      canvas.height = r.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    let t = 0
    const draw = () => {
      const w = canvas.getBoundingClientRect().width
      const h = canvas.getBoundingClientRect().height
      ctx.clearRect(0, 0, w, h)
      // matrices: A (3x3) * B (3x3) = C
      const size = 3
      const cell = Math.min(w, h) * 0.11
      const gap = 14
      const startX = w * 0.5 - (size * cell + gap * 2 + size * cell) * 0.5 - size * cell * 0.5
      const startY = h * 0.5 - (size * cell) * 0.5
      t += 0.008
      const highlight = Math.floor((t * 2) % 9)
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const x = startX + c * cell
          const y = startY + r * cell
          const idx = r * size + c
          const isH = idx === highlight
          ctx.fillStyle = isH ? 'rgba(201,168,106,0.18)' : 'rgba(255,255,255,0.04)'
          ctx.strokeStyle = isH ? 'rgba(201,168,106,0.45)' : 'rgba(255,255,255,0.08)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.roundRect(x, y, cell * 0.88, cell * 0.88, 4)
          ctx.fill()
          ctx.stroke()
          // value
          const v = (Math.sin(idx * 0.9 + t) * 0.7 + 0.7).toFixed(2)
          ctx.fillStyle = isH ? '#FFD60A' : 'rgba(255,255,255,0.72)'
          ctx.font = `${isH ? '700' : '400'} 10px JetBrains Mono`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(v, x + cell * 0.44, y + cell * 0.44)
        }
      }
      // second matrix
      const startX2 = startX + size * cell + gap
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const x = startX2 + c * cell
          const y = startY + r * cell
          ctx.fillStyle = 'rgba(255,255,255,0.03)'
          ctx.strokeStyle = 'rgba(255,255,255,0.06)'
          ctx.beginPath()
          ctx.roundRect(x, y, cell * 0.88, cell * 0.88, 4)
          ctx.fill()
          ctx.stroke()
          const v = (Math.cos((r * size + c) * 0.7 + t * 0.9) * 0.6 + 0.6).toFixed(2)
          ctx.fillStyle = 'rgba(255,255,255,0.62)'
          ctx.fillText(v, x + cell * 0.44, y + cell * 0.44)
        }
      }
      // operator
      ctx.fillStyle = 'var(--gold)'
      ctx.font = '700 14px JetBrains Mono'
      ctx.fillStyle = 'rgba(201,168,106,0.9)'
      ctx.fillText('×', startX + size * cell + gap * 0.42, h * 0.5)
      ctx.fillText('=', startX2 + size * cell + gap * 0.42, h * 0.5)
      // result hint
      ctx.fillStyle = 'rgba(255,255,255,0.42)'
      ctx.font = '10px JetBrains Mono'
      ctx.textAlign = 'left'
      ctx.fillText('3×3 matmul · O(n³)', 8, h - 10)
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ width: '100%', height: '220px', display: 'block' }} />
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [modal, setModal] = useState({ open: false, src: '', caption: '', fallback: false })
  const [avatar, setAvatar] = useState(() => {
    try { return localStorage.getItem('enson_avatar') || '' } catch { return '' }
  })
  const fileRef = useRef(null)

  useEffect(() => {
    let tick = false
    const onScroll = () => {
      if (tick) return
      tick = true
      requestAnimationFrame(() => {
        const st = window.scrollY
        const dh = document.documentElement.scrollHeight - window.innerHeight
        setProgress(dh > 0 ? (st / dh) * 100 : 0)
        tick = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.12 })
    els.forEach((el) => ro.observe(el))
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setModal((m) => ({ ...m, open: false })) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = modal.open ? 'hidden' : ''
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [modal.open])

  const openModal = (src, caption) => setModal({ open: true, src, caption: caption || 'Preview', fallback: false })
  const closeModal = () => setModal((m) => ({ ...m, open: false }))
  const handleAvatar = () => fileRef.current && fileRef.current.click()
  const onFile = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { alert('Please upload an image file.'); e.target.value = ''; return }
    const reader = new FileReader()
    reader.onload = (ev) => {
      const url = ev.target.result
      setAvatar(url)
      try { localStorage.setItem('enson_avatar', url) } catch {}
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <div id="progress" style={{ width: progress + '%' }} />

      <nav className="nav">
        <div className="nav-inner">
          <a className="nav-brand" href="#top">resume</a>
          <div className={navOpen ? 'nav-links open' : 'nav-links'}>
            <a href="#top" onClick={() => setNavOpen(false)}>Enson</a>
            <a href="#education" onClick={() => setNavOpen(false)}>Education</a>
            <a href="#skills" onClick={() => setNavOpen(false)}>Core Skill</a>
            <a href="#work" onClick={() => setNavOpen(false)}>Previous Work</a>
            <a href="#experience" onClick={() => setNavOpen(false)}>Experience</a>
            <a href="#achievements" onClick={() => setNavOpen(false)}>Award</a>
            <a href="#socials" onClick={() => setNavOpen(false)}>Social</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
            <a className="nav-cta ghost" href="mailto:yinkang90804586@gmail.com" style={{ display: 'none' }}>Login</a>
            <a className="nav-cta" href={import.meta.env.BASE_URL + 'Enson resume.pdf'} download>Get CV</a>
            <button className="nav-toggle" aria-label="Menu" onClick={() => setNavOpen((o) => !o)} style={{ display: 'grid' }}>
              <i className={navOpen ? 'fas fa-xmark' : 'fas fa-bars'} />
            </button>
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <div>
          <h1>Enson<br /><i>Chuan</i> <b>Chen Chun</b></h1>
          <p className="hero-sub">
            Python-powered AI Trainer specializing in aligning large language models for enterprise reliability. I architect end-to-end fine-tuning pipelines and implement RLHF reward models to drastically reduce hallucinations. I bridge cutting-edge research with production-grade, cost-efficient AI solutions. AI Trainer & Python developer driving hallucination-free LLMs. I build custom SFT/RLHF pipelines, optimize inference with vLLM, and turn raw data into enterprise-grade conversational AI that delivers measurable business impact.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href={import.meta.env.BASE_URL + 'Enson resume.pdf'} download><i className="fas fa-download" /> Get CV</a>
            <a className="btn-ghost" href="https://wa.me/0195897668" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp" /> WhatsApp</a>
          </div>
          <div style={{ marginTop: '.9rem', display: 'flex', alignItems: 'center', gap: '.6rem', fontSize: '.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)', flexWrap: 'wrap' }}>
            <span><i className="fas fa-phone" /> 0195897668</span>
            <span>·</span>
            <span><i className="fas fa-envelope" /> yinkang90804586@gmail.com</span>
            <span>·</span>
              <span><i className="fas fa-location-dot" /> No 6, Jalan Mutiara Bestari, Taman Mutlara Bestari, 81300, Skudai, Johor Bahru, Johor, Malaysia</span>
          </div>
        </div>

        <div className="demo">
          <div className="demo-head">
            <b><i className="fas fa-cube" /> Live Preview</b>
            <span><i className="fas fa-circle" style={{ color: '#22c55e', fontSize: '.5rem' }} /> live</span>
          </div>
          <MathHeroViz />
          <div className="demo-body" style={{ paddingTop: '.6rem' }}>
            <div className="bubble">
              <div className="bubble-label">System — gradient descent</div>
              <p>Optimizing <b>z = sin(2.2x) · cos(2y)</b> — watch the gold peak track the optimum in real time.</p>
            </div>
          </div>
          <div className="demo-foot">
            <span><b>Enson</b> — visual, rigorous, dark</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
              <div className="avatar-demo" onClick={handleAvatar} title="Click to upload">
                {avatar ? <img src={avatar} alt="Enson" /> : <i className="fas fa-user ph" />}
              </div>
            </div>
          </div>
          <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={onFile} style={{ display: 'none' }} />
        </div>
      </header>
<section className="section" id="education">
        <div className="section-head">
          <div className="section-label">Education</div>
          <h2 className="section-title">Foundation to <i>BSc AI</i></h2>
        </div>
        <div className="timeline reveal">
          <div className="t-row">
            <div className="t-when"><b>September, 2023 - September, 2027</b> expected</div>
            <div>
              <h3>Bachelor&apos;s Degree in Artificial Intelligence</h3>
              <div className="t-sub">Xiamen University Malaysia — Sepang, Selangor</div>
              <div className="t-mods"><span>Machine learning</span><span>deep learning</span><span>Natural Language Processing (NLP)</span><span>Computer vision</span><span>Robotics</span><span>AI with algorithm</span><span>data mining</span><span>data structure</span><span>Statistics and probability</span><span>Intelligence agent</span><span>ethics in AI</span></div>
              <a className="link" href="#" onClick={(e) => { e.preventDefault(); openModal('https://picsum.photos/800/600?random=1', 'BSc AI - XMUM') }}><i className="fas fa-certificate" /> view</a>
            </div>
          </div>
          <div className="t-row">
            <div className="t-when"><b>2022 — 2023</b> completed</div>
            <div>
              <h3>Foundation in Science</h3>
              <div className="t-sub">Xiamen University Malaysia — Sepang, Selangor</div>
              <div className="t-mods"><span>Chemistry</span><span>English for academic purpose</span><span>Physic</span><span>Advanced Math</span><span>Fundamental Computer Science</span><span>Study Skill</span><span>Effective presentation</span><span>Ethics in Science</span></div>
              <a className="link" href="#" onClick={(e) => { e.preventDefault(); openModal('https://picsum.photos/800/600?random=2', 'Foundation - XMUM') }}><i className="fas fa-certificate" /> view</a>
            </div>
          </div>
          <div className="t-row">
            <div className="t-when"><b>2022</b> SPM — Completed</div>
            <div>
              <h3>Sijil Pelajaran Malaysia (SPM) — SMK Taman Selesa Jaya 1</h3>
              <div className="t-sub">Principles of Accounting: A · Chemistry: A+ · Mathematics: A+ · Physic: A+ · Advanced Mathematics: A+ · Biology: A · Bahasa Melayu & English: B+ · History: A</div>
              <a className="link" href="#" onClick={(e) => { e.preventDefault(); openModal('https://picsum.photos/800/600?random=3', 'SPM') }}><i className="fas fa-certificate" /> view</a>
            </div>
          </div>
        </div>
      </section>

            <section className="section" id="skills">
        <div className="section-head">
          <div className="section-label">Core Skill</div>
          <h2 className="section-title">Core <i>Skill</i></h2>
          <p className="section-desc">LLM, Programming, Machine Learning and Core Competencies — minimal, luxury.</p>
        </div>
        <div className="pricing reveal" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="price-card">
            <h3><i className="fas fa-brain" /> LLM & Generative AI</h3>
            <ul>
              <li><i className="fas fa-check" /> Supervised Fine-Tuning (SFT) & PEFT/QLoRA</li>
              <li><i className="fas fa-check" /> Reinforcement Learning from Human Feedback (RLHF) & PPO/DPO</li>
              <li><i className="fas fa-check" /> Prompt Engineering & Instruction Tuning</li>
              <li><i className="fas fa-check" /> LLM Evaluation (RAGAS, DeepEval, BLEU/ROUGE)</li>
              <li><i className="fas fa-check" /> Model Deployment & Inference Optimization (vLLM, HuggingFace TGI)</li>
            </ul>
          </div>
          <div className="price-card">
            <h3><i className="fas fa-code" /> Programming & Data Science</h3>
            <ul>
              <li><i className="fas fa-check" /> Python (PyTorch, Transformers, Pandas, NumPy, Scikit-learn)</li>
              <li><i className="fas fa-check" /> SQL & Data Manipulation</li>
              <li><i className="fas fa-check" /> Data Mining & Feature Engineering</li>
              <li><i className="fas fa-check" /> ETL Pipeline Development</li>
            </ul>
          </div>
          <div className="price-card">
            <h3><i className="fas fa-chart-line" /> Machine Learning & Mathematics</h3>
            <ul>
              <li><i className="fas fa-check" /> Supervised & Unsupervised Learning</li>
              <li><i className="fas fa-check" /> Deep Learning Architectures (CNNs, RNNs, Transformers)</li>
              <li><i className="fas fa-check" /> Statistical Analysis & Probability Theory</li>
              <li><i className="fas fa-check" /> Linear Algebra & Advanced Calculus</li>
            </ul>
          </div>
          <div className="price-card">
            <h3><i className="fas fa-users" /> Core Competencies</h3>
            <ul>
              <li><i className="fas fa-check" /> AI Ethics & Responsible AI Alignment</li>
              <li><i className="fas fa-check" /> Cross-functional Collaboration</li>
              <li><i className="fas fa-check" /> Technical Documentation & Presentation</li>
              <li><i className="fas fa-check" /> Research & Rapid Prototyping</li>
            </ul>
          </div>
        </div>
      </section>

<section className="section" id="work">
        <div className="section-head">
          <div className="section-label">Previous Work — Featured Projects</div>
          <h2 className="section-title">Previous <i>Work</i></h2>
          <p className="section-desc">4 featured builds — RL, LSTM, MCTS and data analysis across fields.</p>
        </div>
        <div className="pricing reveal" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="price-card">
            <div style={{ width: '32px', height: '32px', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: 'var(--gold)', background: 'rgba(201,168,106,0.06)', borderRadius: '8px' }}><i className="fas fa-gamepad" /></div>
            <h3>2D Pickle Ball — RL in Unity</h3>
            <div className="sub">Reinforcement Learning · Unity ML-Agents</div>
            <p style={{ fontSize: '.82rem', color: 'var(--muted)', marginTop: '.3rem', lineHeight: 1.6 }}>Trained RL agent for 2D pickle ball — reward shaping, self-play, and policy optimization in Unity.</p>
            <div><span className="tag">Unity</span><span className="tag">ML-Agents</span><span className="tag">PPO</span></div>
          </div>
          <div className="price-card">
            <div style={{ width: '32px', height: '32px', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: 'var(--gold)', background: 'rgba(201,168,106,0.06)', borderRadius: '8px' }}><i className="fas fa-chart-line" /></div>
            <h3>LSTM — TradingView Prediction</h3>
            <div className="sub">Time Series · Deep Learning</div>
            <p style={{ fontSize: '.82rem', color: 'var(--muted)', marginTop: '.3rem', lineHeight: 1.6 }}>LSTM model to predict TradingView price movements — sequence modeling, normalization, and backtesting.</p>
            <div><span className="tag">LSTM</span><span className="tag">Python</span><span className="tag">TradingView</span></div>
          </div>
          <div className="price-card">
            <div style={{ width: '32px', height: '32px', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: 'var(--gold)', background: 'rgba(201,168,106,0.06)', borderRadius: '8px' }}><i className="fas fa-clover" /></div>
            <h3>Texas Poker — MCTS</h3>
            <div className="sub">Game AI · Search</div>
            <p style={{ fontSize: '.82rem', color: 'var(--muted)', marginTop: '.3rem', lineHeight: 1.6 }}>Monte Carlo Tree Search for Texas Hold’em — decision under uncertainty, simulation, and opponent modeling.</p>
            <div><span className="tag">MCTS</span><span className="tag">Python</span><span className="tag">Game Theory</span></div>
          </div>
          <div className="price-card">
            <div style={{ width: '32px', height: '32px', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: 'var(--gold)', background: 'rgba(201,168,106,0.06)', borderRadius: '8px' }}><i className="fas fa-database" /></div>
            <h3>Data Analysis — Multi-field</h3>
            <div className="sub">Analytics · Visualization</div>
            <p style={{ fontSize: '.82rem', color: 'var(--muted)', marginTop: '.3rem', lineHeight: 1.6 }}>Numerous analyses across different fields — cleaning, EDA, statistics, and storytelling with data.</p>
            <div><span className="tag">pandas</span><span className="tag">SQL</span><span className="tag">Visualization</span></div>
          </div>
        </div>
      </section>


      <section className="section" id="experience">
        <div className="section-head">
          <div className="section-label">Relevant Experience & Activities — as per resume</div>
          <h2 className="section-title float-title">Experience <i>— 6 roles</i></h2>
          <p className="section-desc">Exactly as listed: Multi-Media, President, Advisor, Vice President Dragon & Lion Dance Troupe, Part-Time Cashier Lapasta, Event Planner Xnergy Sport Carnival.</p>
        </div>
        <div className="exp-grid reveal exp-float" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', perspective: '1000px' }}>
          {[
            { role: 'Multi-Media', org: 'First Aid Society', desc: 'First Aid Society — 1 Year', icon: 'fa-photo-film' },
            { role: 'President', org: 'First Aid Society', desc: 'First Aid Society — 1 Year', icon: 'fa-crown' },
            { role: 'Advisor', org: 'First Aid Society', desc: 'First Aid Society — 1 Year', icon: 'fa-user-tie' },
            { role: 'Vice President', org: 'Dragon & Lion Dance Troupe', desc: 'Dragon & Lion Dance Troupe — 1 Year', icon: 'fa-dragon' },
            { role: 'Event Planner', org: 'Xnergy Sport Carnival', desc: 'Xnergy Sport Carnival', icon: 'fa-calendar-check' },
          ].map((e) => (
            <div key={e.role} className="exp-card" style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '1rem', cursor: 'pointer' }} onClick={() => openModal('https://picsum.photos/800/600?random=' + e.role.length, e.role + ' — ' + e.org)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                <div style={{ width: '28px', height: '28px', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: 'var(--gold)', background: 'rgba(201,168,106,0.06)' }}><i className={'fas ' + e.icon} /></div>
                <div><div style={{ fontWeight: 700, fontSize: '.88rem' }}>{e.role}</div><div style={{ fontSize: '.62rem', color: 'var(--muted)', letterSpacing: '.06em', textTransform: 'uppercase' }}>{e.org}</div></div>
              </div>
              <div style={{ fontSize: '.68rem', color: 'var(--muted)', marginTop: '.4rem', lineHeight: 1.6 }}>{e.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="achievements">
        <div className="section-head">
          <div className="section-label">Certifications & Achievements — as per resume</div>
          <h2 className="section-title">Achievements</h2>
          <p className="section-desc">Exactly as listed: 3× Finalist + Basic Occupational First Aid, CPR & AED.</p>
        </div>
        <div className="ach-grid reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '.8rem', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ width: '28px', height: '28px', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: 'var(--gold)', background: 'rgba(201,168,106,0.06)' }}><i className="fas fa-trophy" /></div>
            <div><h4 style={{ fontSize: '.9rem', fontWeight: 700 }}>XMUM Leader of the year Finalist</h4><p style={{ fontSize: '.68rem', color: 'var(--muted)' }}>As listed in resume.</p></div>
          </div>
          <div style={{ display: 'flex', gap: '.8rem', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ width: '28px', height: '28px', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: 'var(--gold)', background: 'rgba(201,168,106,0.06)' }}><i className="fas fa-lightbulb" /></div>
            <div><h4 style={{ fontSize: '.9rem', fontWeight: 700 }}>XMUM Best Innovative Event Finalist</h4><p style={{ fontSize: '.68rem', color: 'var(--muted)' }}>As listed in resume.</p></div>
          </div>
          <div style={{ display: 'flex', gap: '.8rem', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ width: '28px', height: '28px', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: 'var(--gold)', background: 'rgba(201,168,106,0.06)' }}><i className="fas fa-medal" /></div>
            <div><h4 style={{ fontSize: '.9rem', fontWeight: 700 }}>XMUM Most Active Non-sport Club Finalist</h4><p style={{ fontSize: '.68rem', color: 'var(--muted)' }}>As listed in resume.</p></div>
          </div>
          <div style={{ display: 'flex', gap: '.8rem', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ width: '28px', height: '28px', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: 'var(--gold)', background: 'rgba(201,168,106,0.06)' }}><i className="fas fa-heart-pulse" /></div>
            <div><h4 style={{ fontSize: '.9rem', fontWeight: 700 }}>Basic Occupational First Aid, CPR & AED</h4><p style={{ fontSize: '.68rem', color: 'var(--muted)' }}>As listed in resume.</p></div>
          </div>
        </div>
      </section>

<section className="section" id="socials">
        <div className="section-head">
          <div className="section-num">02</div>
          <h2 className="section-title">Connect <i>— socials</i></h2>
          <p className="section-desc">Find me — coding and personal.</p>
        </div>
        <div className="pricing reveal" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <a href="https://github.com/Peanut0920" target="_blank" rel="noopener noreferrer" className="price-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3><i className="fab fa-github" /> GitHub</h3>
            <div className="sub">github.com/Peanut0920</div>
            <p style={{ fontSize: '.82rem', color: 'var(--muted)', marginTop: '.3rem' }}>Code, projects, and open source.</p>
            <span className="link" style={{ marginTop: '.6rem' }}><i className="fas fa-arrow-up-right-from-square" /> Visit</span>
          </a>
          <a href="https://www.instagram.com/z_chengjun?igsi=MWR1ZGRka2R5bjd4Ng==" target="_blank" rel="noopener noreferrer" className="price-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3><i className="fab fa-instagram" /> Instagram — Personal</h3>
            <div className="sub">@z_chengjun</div>
            <p style={{ fontSize: '.82rem', color: 'var(--muted)', marginTop: '.3rem' }}>Personal life and moments.</p>
            <span className="link" style={{ marginTop: '.6rem' }}><i className="fas fa-arrow-up-right-from-square" /> Visit</span>
          </a>
          <a href="https://www.instagram.com/neonforge.ai.studio?igsi=MW8zbTJzcGJ1amYwdQ==" target="_blank" rel="noopener noreferrer" className="price-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3><i className="fab fa-instagram" /> Instagram — Coding</h3>
            <div className="sub">@neonforge.ai.studio</div>
            <p style={{ fontSize: '.82rem', color: 'var(--muted)', marginTop: '.3rem' }}>AI studio — builds and experiments.</p>
            <span className="link" style={{ marginTop: '.6rem' }}><i className="fas fa-arrow-up-right-from-square" /> Visit</span>
          </a>
        </div>
      </section>
<section className="cta">
        <div>
          <h2>Start creating clear, concise notes <i>within minutes</i></h2>
          <p>Open to internships — AI, data, disciplined execution.</p>
        </div>
        <div className="cta-actions">
          <a className="btn-primary" href={import.meta.env.BASE_URL + 'Enson resume.pdf'} download><i className="fas fa-download" /> Get CV</a>
          <a className="btn-ghost" href="https://wa.me/0195897668" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp" /> WhatsApp — 019-589 7668</a>
        </div>
      </section>

      <footer className="footer">
        <div>© 2026 Enson Chuan Chen Chun — Skudai, Johor</div>
        <div style={{ display: 'flex', gap: '1.2rem' }}>
          <a href="mailto:yinkang90804586@gmail.com">Contact</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>
      </footer>

      {modal.open && (
        <div className="modal" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}>
          <div className="modal-box">
            <div className="modal-head"><h3>{modal.caption}</h3><button onClick={closeModal}><i className="fas fa-xmark" /></button></div>
            <div className="modal-body">
              {!modal.fallback ? <img src={modal.src} alt="Preview" onError={() => setModal((m) => ({ ...m, fallback: true }))} /> : (
                <div style={{ textAlign: 'center', color: 'var(--muted)' }}><i className="fas fa-image" style={{ fontSize: '1.8rem', opacity: .4 }} /><p>Preview not available</p></div>
              )}
            </div>
            <div className="modal-foot">Click outside or press Esc to close</div>
          </div>
        </div>
      )}
    </>
  )
}
