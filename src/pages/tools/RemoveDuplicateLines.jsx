import React, { useState, useMemo } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

export default function RemoveDuplicateLines() {
  const [inputText, setInputText] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [trimWhitespace, setTrimWhitespace] = useState(true)
  const [emptyLines, setEmptyLines] = useState('keep')
  const [copied, setCopied] = useState(false)

  const processedText = useMemo(() => {
    if (!inputText.trim()) return ''

    let lines = inputText.split('\n')

    // Handle empty lines
    if (emptyLines === 'remove') {
      lines = lines.filter(line => line.trim() !== '')
    } else if (emptyLines === 'remove-multiple') {
      lines = lines.filter((line, index, arr) => {
        if (line.trim() === '') {
          return index === 0 || arr[index - 1].trim() !== ''
        }
        return true
      })
    }

    // Trim whitespace if enabled
    if (trimWhitespace) {
      lines = lines.map(line => line.trim())
    }

    // Remove duplicates
    const seen = new Set()
    const uniqueLines = []

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase()
      if (!seen.has(key)) {
        seen.add(key)
        uniqueLines.push(line)
      }
    }

    return uniqueLines.join('\n')
  }, [inputText, caseSensitive, trimWhitespace, emptyLines])

  const stats = useMemo(() => {
    const inputLines = inputText.split('\n').length
    const outputLines = processedText.split('\n').length
    const duplicatesRemoved = inputLines - outputLines

    return {
      inputLines,
      outputLines,
      duplicatesRemoved,
      compressionRatio: inputLines > 0 ? ((duplicatesRemoved / inputLines) * 100).toFixed(1) : 0
    }
  }, [inputText, processedText])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(processedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const clearAll = () => {
    setInputText('')
    setCopied(false)
  }

  const loadSample = () => {
    const sample = `apple
banana
apple
cherry
banana
date
Apple
apple
BANANA

cherry
date
date`
    setInputText(sample)
  }

  return (
    <ToolWrapper
      title="Remove Duplicate Lines — Online Text Deduplication"
      description="Text se duplicate lines remove karo. Case sensitivity, whitespace handling aur empty lines control."
      keywords="remove duplicate lines, deduplicate text, text cleaner, duplicate remover, text processing"
      emoji="🧹"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #dc2626 50%, #ea580c 100%)"
      toolName="Remove Duplicate Lines"
      tagline="Clean Text · Remove Duplicates · Process Lists"
      guideSteps={[
        { heading: 'Text paste karo', text: 'Duplicate lines wala text neeche box mein daalo.' },
        { heading: 'Options set karo', text: 'Case sensitivity aur whitespace settings adjust karo.' },
        { heading: 'Process karo', text: 'Duplicate lines automatically remove ho jaengi.' },
        { heading: 'Copy karo', text: 'Clean text copy karke use karo.' },
      ]}
      faqs={[
        { q: 'Case sensitive ka kya matlab?', a: 'On hone pe "Apple" aur "apple" ko different treat karta hai. Off hone pe same.' },
        { q: 'Empty lines ka kya?', a: 'Keep: sab lines rakhta hai. Remove: saari empty lines hata deta hai. Remove multiple: consecutive empty lines ko ek mein convert karta hai.' },
        { q: 'Maximum text size kitna?', a: '10,000 lines tak support karta hai. Large text ke liye browser reload kar sakte hain.' },
        { q: 'Original order maintain hota hai?', a: 'Haan, pehli occurrence ko preserve karta hai, baaki duplicates remove karta hai.' },
      ]}
      relatedBlog={{ slug: 'text-processing-tools', title: 'Text Processing Tools Guide', excerpt: 'Text cleaning aur processing ke best practices.' }}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/text-case-converter', emoji: '🔤', name: 'Text Case Converter' },
        { path: '/tools/word-counter', emoji: '📝', name: 'Word Counter' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">📝 Input Text</div>
        <textarea
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Duplicate lines wala text yahan paste karo...&#10;&#10;Example:&#10;apple&#10;banana&#10;apple&#10;cherry"
          style={{
            width: '100%',
            minHeight: 200,
            padding: '12px',
            border: '1.5px solid #e5e7eb',
            borderRadius: 8,
            fontSize: '0.9rem',
            fontFamily: 'inherit',
            lineHeight: 1.5,
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />
        <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
          <button
            className="tw-calc-btn"
            onClick={loadSample}
            style={{ background: '#f3f4f6', color: '#111', border: '1.5px solid #e5e7eb' }}
          >
            📋 Load Sample
          </button>
          <button
            className="tw-calc-btn"
            onClick={clearAll}
            style={{ background: '#fee2e2', color: '#dc2626', border: '1.5px solid #fecaca' }}
          >
            🗑️ Clear All
          </button>
        </div>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">⚙️ Processing Options</div>
        <div className="tw-input-group">
          <div className="tw-field">
            <label>🔤 Case Sensitive</label>
            <select value={caseSensitive} onChange={e => setCaseSensitive(e.target.value === 'true')}>
              <option value={false}>No (apple = Apple)</option>
              <option value={true}>Yes (apple ≠ Apple)</option>
            </select>
          </div>
          <div className="tw-field">
            <label>✂️ Trim Whitespace</label>
            <select value={trimWhitespace} onChange={e => setTrimWhitespace(e.target.value === 'true')}>
              <option value={true}>Yes (remove spaces)</option>
              <option value={false}>No (keep spaces)</option>
            </select>
          </div>
          <div className="tw-field">
            <label>📄 Empty Lines</label>
            <select value={emptyLines} onChange={e => setEmptyLines(e.target.value)}>
              <option value="keep">Keep all</option>
              <option value="remove">Remove all</option>
              <option value="remove-multiple">Remove multiple consecutive</option>
            </select>
          </div>
        </div>
      </div>

      {inputText.trim() && (
        <>
          <div className="tp-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div className="tp-sec-title" style={{ margin: 0 }}>📊 Statistics</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                {stats.duplicatesRemoved > 0 && (
                  <span style={{ color: '#dc2626', fontWeight: 600 }}>
                    {stats.duplicatesRemoved} duplicates removed ({stats.compressionRatio}%)
                  </span>
                )}
              </div>
            </div>
            <div className="tw-breakdown">
              <div className="tw-brow">
                <span className="tw-brow-label">📥 Input Lines</span>
                <span className="tw-brow-val">{stats.inputLines}</span>
              </div>
              <div className="tw-brow">
                <span className="tw-brow-label">📤 Output Lines</span>
                <span className="tw-brow-val">{stats.outputLines}</span>
              </div>
              <div className="tw-brow">
                <span className="tw-brow-label">🗑️ Duplicates Removed</span>
                <span className="tw-brow-val">{stats.duplicatesRemoved}</span>
              </div>
            </div>
          </div>

          <div className="tp-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div className="tp-sec-title" style={{ margin: 0 }}>📋 Processed Text</div>
              <button
                onClick={copyToClipboard}
                style={{
                  padding: '8px 16px',
                  background: copied ? '#16a34a' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {copied ? '✅ Copied!' : '📋 Copy Text'}
              </button>
            </div>
            <div
              style={{
                padding: 16,
                background: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: 8,
                fontSize: '0.9rem',
                lineHeight: 1.5,
                color: '#1e293b',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                maxHeight: 300,
                overflowY: 'auto'
              }}
            >
              {processedText || 'No text to display'}
            </div>
          </div>
        </>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">📝 Text Deduplication Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Data cleaning ka important part hai duplicate entries remove karna. Lists, emails, names, ya koi bhi text data mein duplicates common hote hain. Yeh guide aapko sikhaega ki duplicates kaise identify karein aur remove karein efficiently.
          </p>

          <h3>1. Kyun Important Hai Duplicate Removal?</h3>
          <p>
            Duplicates data quality ko affect karte hain:
          </p>
          <ul>
            <li><strong>Accuracy:</strong> Wrong counts aur statistics</li>
            <li><strong>Storage:</strong> Unnecessary space usage</li>
            <li><strong>Performance:</strong> Slow processing</li>
            <li><strong>Analysis:</strong> Incorrect insights</li>
          </ul>

          <h3>2. Types of Duplicates</h3>
          <ul>
            <li><strong>Exact duplicates:</strong> Completely identical entries</li>
            <li><strong>Case variations:</strong> "Apple" vs "apple"</li>
            <li><strong>Whitespace differences:</strong> " apple " vs "apple"</li>
            <li><strong>Partial duplicates:</strong> Similar but not identical</li>
          </ul>

          <h3>3. Case Sensitivity</h3>
          <p>
            Case sensitive comparison mein:
          </p>
          <ul>
            <li>"Apple" ≠ "apple" ≠ "APPLE"</li>
            <li>Best for: Codes, IDs, proper nouns</li>
          </ul>
          <p>
            Case insensitive comparison mein:
          </p>
          <ul>
            <li>"Apple" = "apple" = "APPLE"</li>
            <li>Best for: Names, general text</li>
          </ul>

          <h3>4. Whitespace Handling</h3>
          <p>
            Leading/trailing spaces ko trim karna important hai:
          </p>
          <ul>
            <li>Before: " apple " (with spaces)</li>
            <li>After: "apple" (clean)</li>
          </ul>

          <h3>5. Empty Lines Management</h3>
          <ul>
            <li><strong>Keep all:</strong> Original formatting preserve karta hai</li>
            <li><strong>Remove all:</strong> Saari empty lines hata deta hai</li>
            <li><strong>Remove multiple:</strong> Consecutive empty lines ko ek mein convert karta hai</li>
          </ul>

          <h3>6. When to Use This Tool</h3>
          <ul>
            <li>Email lists cleaning</li>
            <li>Product catalogs</li>
            <li>Customer databases</li>
            <li>Survey responses</li>
            <li>Log files</li>
            <li>Code lists</li>
          </ul>

          <h3>7. Advanced Techniques</h3>
          <p>
            Complex deduplication ke liye:
          </p>
          <ul>
            <li><strong>Fuzzy matching:</strong> Similar entries find karna</li>
            <li><strong>Soundex:</strong> Same sounding words</li>
            <li><strong>Levenshtein distance:</strong> Edit distance based</li>
          </ul>

          <h3>8. Programming Approaches</h3>
          <p>
            Code mein duplicates remove karne ke liye:
          </p>
          <ul>
            <li><strong>JavaScript:</strong> new Set(array)</li>
            <li><strong>Python:</strong> list(set(list_name))</li>
            <li><strong>Excel:</strong> Remove Duplicates feature</li>
            <li><strong>SQL:</strong> DISTINCT keyword</li>
          </ul>

          <h3>9. Large Dataset Handling</h3>
          <p>
            Big data ke liye:
          </p>
          <ul>
            <li>Chunk processing</li>
            <li>Database indexing</li>
            <li>External sorting</li>
            <li>Parallel processing</li>
          </ul>

          <h3>10. Quality Assurance</h3>
          <p>
            Deduplication ke baad check karo:
          </p>
          <ul>
            <li>Sample validation</li>
            <li>Count verification</li>
            <li>Data integrity</li>
            <li>Backup preservation</li>
          </ul>

          <h3>11. Common Mistakes</h3>
          <ul>
            <li>Wrong case sensitivity settings</li>
            <li>Important duplicates removing</li>
            <li>Original order not preserving</li>
            <li>No backup before processing</li>
          </ul>

          <h3>12. Industry Applications</h3>
          <ul>
            <li><strong>CRM:</strong> Contact deduplication</li>
            <li><strong>E-commerce:</strong> Product catalog cleaning</li>
            <li><strong>Marketing:</strong> Email list hygiene</li>
            <li><strong>Finance:</strong> Transaction deduplication</li>
          </ul>

          <p>
            Yeh tool basic text deduplication ke liye perfect hai. Complex data cleaning ke liye specialized software use karo. Practice se aap expert ban jaoge data quality management mein!
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}