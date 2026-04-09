import React, { useMemo, useState } from 'react'
import SEOHead from '../../components/SEOHead'
import './ResumeTemplate.css'

const DEFAULT_STATE = {
  name: '',
  email: '',
  phone: '',
  skills: '',
  experience: '',
  education: '',
}

export default function ResumeTemplate() {
  const [form, setForm] = useState(DEFAULT_STATE)
  const [copyStatus, setCopyStatus] = useState('')

  const resumeText = useMemo(() => {
    const lines = []
    if (form.name) lines.push(form.name)
    if (form.email) lines.push(form.email)
    if (form.phone) lines.push(form.phone)
    if (form.skills) {
      lines.push('\nSkills:')
      lines.push(form.skills)
    }
    if (form.experience) {
      lines.push('\nExperience:')
      lines.push(form.experience)
    }
    if (form.education) {
      lines.push('\nEducation:')
      lines.push(form.education)
    }
    return lines.join('\n')
  }, [form])

  const handleChange = (field) => (event) => {
    setForm(prev => ({ ...prev, [field]: event.target.value }))
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resumeText.trim())
      setCopyStatus('Copied! ✅')
    } catch (err) {
      setCopyStatus('Unable to copy. Please copy manually.')
    }

    setTimeout(() => setCopyStatus(''), 2500)
  }

  const handleDownloadPDF = () => {
    // Use browser print dialog (save as PDF)
    window.print()
  }

  return (
    <div className="resume-page">
      <SEOHead
        title="Free Resume Template Builder – Create Professional Resume Online"
        description="Create a professional resume online using our free resume template builder. Generate and download your CV easily."
      />

      <header className="resume-hero">
        <h1>Free Resume Template Builder</h1>
        <p className="resume-subtitle">
          Build your resume fast and download it as a PDF. Fill the form then copy or print the resume for easy sharing.
        </p>
      </header>

      <section className="resume-tool" id="resume-tool">
        <div className="resume-grid">
          <form className="resume-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <label>Name</label>
              <input type="text" value={form.name} onChange={handleChange('name')} placeholder="Jane Doe" />
            </div>

            <div className="form-row">
              <label>Email</label>
              <input type="email" value={form.email} onChange={handleChange('email')} placeholder="jane@example.com" />
            </div>

            <div className="form-row">
              <label>Phone</label>
              <input type="tel" value={form.phone} onChange={handleChange('phone')} placeholder="+1 555 123 4567" />
            </div>

            <div className="form-row">
              <label>Skills</label>
              <textarea value={form.skills} onChange={handleChange('skills')} placeholder="e.g. JavaScript, React, SQL" rows={3} />
            </div>

            <div className="form-row">
              <label>Experience</label>
              <textarea value={form.experience} onChange={handleChange('experience')} placeholder="Describe your most relevant jobs and achievements" rows={4} />
            </div>

            <div className="form-row">
              <label>Education</label>
              <textarea value={form.education} onChange={handleChange('education')} placeholder="List your degrees, institutions, and years" rows={3} />
            </div>

            <div className="resume-actions">
              <button type="button" className="btn-primary" onClick={handleCopy}>Copy Resume</button>
              <button type="button" className="btn-secondary" onClick={handleDownloadPDF}>Download Resume as PDF</button>
            </div>
            {copyStatus && <div className="copy-status">{copyStatus}</div>}
          </form>

          <div className="resume-preview" id="resume-preview">
            <div className="resume-preview-inner" id="resume-print-area">
              <div className="resume-header">
                <div className="resume-name">{form.name || 'Your Name'}</div>
                <div className="resume-contact">
                  {form.email && <span>{form.email}</span>}
                  {form.phone && <span>{form.phone}</span>}
                </div>
              </div>

              <div className="resume-section">
                <h2>Skills</h2>
                <p>{form.skills || 'Add your key skills here.'}</p>
              </div>

              <div className="resume-section">
                <h2>Experience</h2>
                <p>{form.experience || 'Add your professional experience here.'}</p>
              </div>

              <div className="resume-section">
                <h2>Education</h2>
                <p>{form.education || 'Add your education details here.'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="resume-info">
          <h2>How to use this resume template</h2>
          <p>
            Enter your personal details, work history, education and skills in the form above. As soon as you type, the live preview updates so you can see how your resume will look.
            Use the "Copy Resume" button to quickly paste your resume into emails or chat apps. If you want a shareable file, click "Download Resume as PDF" and choose "Save as PDF" in the print dialog.
          </p>

          <h2>Benefits of using resume templates</h2>
          <p>
            A clean, structured resume helps recruiters quickly scan your qualifications. This builder gives you a simple layout that works on mobile and desktop, letting you tweak your content without needing any design software.
            It keeps everything in one place and helps maintain a consistent format each time you update your CV.
          </p>

          <h2>FAQ</h2>
          <h3>Can I edit the resume later?</h3>
          <p>
            Yes. Just revisit this page and update the fields. Your browser may keep the previous values if you don&apos;t clear the page, but it does not store your data permanently.
          </p>

          <h3>How do I get a PDF?</h3>
          <p>
            Click "Download Resume as PDF" and use the print dialog to save as a PDF. This works in most modern browsers without installing anything.
          </p>

          <h3>Is my information saved?</h3>
          <p>
            No personal data is stored by this tool. Everything stays in your browser as you type.
          </p>
        </div>
      </section>
    </div>
  )
}
