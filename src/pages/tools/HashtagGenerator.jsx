import React, { useState } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

const HASHTAG_CATEGORIES = {
  fashion: [
    '#Fashion', '#Style', '#Outfit', '#FashionNova', '#FashionBlog', '#StreetStyle', '#FashionDesigner',
    '#FashionWeek', '#FashionPhotography', '#FashionModel', '#FashionIcon', '#FashionTrends', '#FashionDaily',
    '#StyleInspo', '#FashionLovers', '#FashionAddict', '#Fashionista', '#FashionBlogger', '#FashionStylist'
  ],
  fitness: [
    '#Fitness', '#Workout', '#Gym', '#FitnessMotivation', '#FitFam', '#Bodybuilding', '#CrossFit',
    '#Yoga', '#Pilates', '#Running', '#Cardio', '#StrengthTraining', '#FitnessJourney', '#FitLife',
    '#HealthyLifestyle', '#FitnessAddict', '#WorkoutMotivation', '#GymLife', '#FitnessGoals', '#TrainHard'
  ],
  food: [
    '#Food', '#Foodie', '#InstaFood', '#FoodPhotography', '#FoodBlog', '#Delicious', '#Yummy',
    '#FoodLovers', '#Foodstagram', '#Homemade', '#Cooking', '#Recipe', '#FoodPorn', '#EatClean',
    '#HealthyFood', '#FoodBlogger', '#Culinary', '#Gourmet', '#FoodArt', '#Tasty'
  ],
  travel: [
    '#Travel', '#TravelPhotography', '#Wanderlust', '#Adventure', '#TravelGram', '#Explore',
    '#TravelBlog', '#Backpacking', '#SoloTravel', '#TravelAddict', '#Nature', '#Landscape',
    '#Beach', '#Mountain', '#CityBreak', '#Culture', '#Heritage', '#Tourism', '#Vacation', '#RoadTrip'
  ],
  business: [
    '#Business', '#Entrepreneur', '#Startup', '#Entrepreneurship', '#BusinessOwner', '#SmallBusiness',
    '#BusinessTips', '#Marketing', '#DigitalMarketing', '#SocialMedia', '#Branding', '#Leadership',
    '#Success', '#Motivation', '#Inspiration', '#Goals', '#Hustle', '#WorkHard', '#BusinessGrowth'
  ],
  photography: [
    '#Photography', '#PhotoOfTheDay', '#Instagram', '#InstaDaily', '#Photo', '#Photographer',
    '#PhotographyLovers', '#MobilePhotography', '#StreetPhotography', '#Portrait', '#Landscape',
    '#NaturePhotography', '#TravelPhotography', '#FoodPhotography', '#FashionPhotography', '#Art'
  ],
  lifestyle: [
    '#Lifestyle', '#Life', '#Happiness', '#Motivation', '#Inspiration', '#PositiveVibes',
    '#GoodVibes', '#LifeLessons', '#PersonalDevelopment', '#SelfCare', '#Mindfulness', '#Wellness',
    '#HealthyLiving', '#Balance', '#Gratitude', '#Joy', '#Peace', '#Love', '#Family', '#Friends'
  ],
  technology: [
    '#Technology', '#Tech', '#Innovation', '#Gadgets', '#Smartphone', '#TechNews', '#Digital',
    '#Programming', '#Coding', '#Developer', '#TechLife', '#FutureTech', '#AI', '#MachineLearning',
    '#Blockchain', '#Crypto', '#Startups', '#TechTrends', '#Gamer', '#Gaming'
  ]
}

const POPULAR_HASHTAGS = [
  '#Love', '#Instagood', '#PhotoOfTheDay', '#Beautiful', '#Happy', '#Life', '#Fashion', '#Style',
  '#Motivation', '#Inspiration', '#Fitness', '#Workout', '#Foodie', '#Delicious', '#Travel', '#Adventure',
  '#Nature', '#Photography', '#Art', '#Music', '#Dance', '#Fun', '#Smile', '#Friends', '#Family',
  '#Home', '#Garden', '#Sunset', '#Beach', '#Mountain', '#City', '#Street', '#Architecture', '#Design'
]

export default function HashtagGenerator() {
  const [keyword, setKeyword] = useState('')
  const [categories, setCategories] = useState([])
  const [numHashtags, setNumHashtags] = useState(15)
  const [includePopular, setIncludePopular] = useState(true)
  const [hashtags, setHashtags] = useState([])
  const [copied, setCopied] = useState(false)

  const generateHashtags = () => {
    const selectedHashtags = new Set()

    // Add category-specific hashtags
    categories.forEach(category => {
      const categoryTags = HASHTAG_CATEGORIES[category] || []
      const shuffled = [...categoryTags].sort(() => Math.random() - 0.5)
      shuffled.slice(0, Math.ceil(numHashtags / categories.length)).forEach(tag => {
        selectedHashtags.add(tag)
      })
    })

    // Add keyword-based hashtags
    if (keyword.trim()) {
      const keywordVariations = [
        `#${keyword.replace(/\s+/g, '')}`,
        `#${keyword.replace(/\s+/g, '_')}`,
        `#${keyword.replace(/\s+/g, 'And')}`,
        `#${keyword.replace(/\s+/g, '')}Life`,
        `#${keyword.replace(/\s+/g, '')}Lovers`,
        `#${keyword.replace(/\s+/g, '')}Goals`,
        `#My${keyword.replace(/\s+/g, '')}`,
        `#Best${keyword.replace(/\s+/g, '')}`,
        `#${keyword.replace(/\s+/g, '')}Tips`
      ]
      keywordVariations.forEach(tag => selectedHashtags.add(tag))
    }

    // Add popular hashtags
    if (includePopular) {
      const shuffledPopular = [...POPULAR_HASHTAGS].sort(() => Math.random() - 0.5)
      shuffledPopular.slice(0, Math.min(5, numHashtags - selectedHashtags.size)).forEach(tag => {
        selectedHashtags.add(tag)
      })
    }

    // Convert to array and limit
    const finalHashtags = Array.from(selectedHashtags).slice(0, numHashtags)
    setHashtags(finalHashtags)
  }

  const copyHashtags = async () => {
    const text = hashtags.join(' ')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const toggleCategory = (category) => {
    setCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <ToolWrapper
      title="Hashtag Generator — Instagram Hashtags Banayein"
      description="Relevant hashtags generate karo. Categories, keywords aur popularity ke basis pe perfect hashtag combinations banao."
      keywords="hashtag generator, instagram hashtags, social media hashtags, hashtag tool, trending hashtags"
      emoji="#️⃣"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #7c3aed 50%, #ec4899 100%)"
      toolName="Hashtag Generator"
      tagline="Smart Hashtags · Categories · Keywords — Engagement Badhao"
      guideSteps={[
        { heading: 'Keyword daalo', text: 'Apni post ka main topic ya keyword enter karo.' },
        { heading: 'Categories select karo', text: 'Fashion, fitness, food etc. se relevant categories choose karo.' },
        { heading: 'Number of hashtags set karo', text: 'Kitne hashtags chahiye — 10-30 ideal hai.' },
        { heading: 'Generate karo', text: 'Perfect hashtag combination milegi.' },
      ]}
      faqs={[
        { q: 'Kitne hashtags use karne chahiye?', a: 'Instagram pe 5-10 hashtags best. Zyada hashtags spam lagte hain.' },
        { q: 'Hashtags kahan daalne chahiye?', a: 'Caption ke end mein ya comment mein. Caption mein hidden karne ke liye line breaks use karo.' },
        { q: 'Trending hashtags kaise find karein?', a: 'Instagram search mein hashtags check karo. High posts wale trending hain.' },
        { q: 'Branded hashtags banane chahiye?', a: 'Haan, unique branded hashtags banao jaise #YourBrandName.' },
      ]}
      relatedBlog={{ slug: 'instagram-hashtag-strategy', title: 'Instagram Hashtag Strategy 2026', excerpt: 'Hashtags se reach badhane ki complete guide.' }}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/instagram-caption-generator', emoji: '📸', name: 'Instagram Caption Generator' },
        { path: '/tools/content-idea-generator', emoji: '💡', name: 'Content Idea Generator' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">🏷️ Generate Hashtags</div>
        <div className="tw-input-group">
          <div className="tw-field" style={{ flex: '1 1 100%' }}>
            <label>🔍 Keyword / Topic</label>
            <input
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="e.g. fitness, food, travel, fashion"
            />
          </div>
          <div className="tw-field" style={{ flex: '1 1 100%' }}>
            <label>📂 Categories (multiple select)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
              {Object.keys(HASHTAG_CATEGORIES).map(category => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  style={{
                    padding: '6px 12px',
                    border: `1.5px solid ${categories.includes(category) ? '#7c3aed' : '#e5e7eb'}`,
                    background: categories.includes(category) ? '#7c3aed' : 'white',
                    color: categories.includes(category) ? 'white' : '#555',
                    borderRadius: 20,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="tw-field">
            <label>🔢 Number of Hashtags</label>
            <select value={numHashtags} onChange={e => setNumHashtags(Number(e.target.value))}>
              <option value={10}>10 hashtags</option>
              <option value={15}>15 hashtags</option>
              <option value={20}>20 hashtags</option>
              <option value={25}>25 hashtags</option>
              <option value={30}>30 hashtags</option>
            </select>
          </div>
          <div className="tw-field">
            <label>⭐ Include Popular Hashtags</label>
            <select value={includePopular} onChange={e => setIncludePopular(e.target.value === 'true')}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <button
            className="tw-calc-btn"
            onClick={generateHashtags}
            disabled={!keyword.trim() && categories.length === 0}
            style={{ flex: '1 1 100%' }}
          >
            🎯 Generate Hashtags
          </button>
        </div>
      </div>

      {hashtags.length > 0 && (
        <div className="tp-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div className="tp-sec-title" style={{ margin: 0 }}>📋 Generated Hashtags ({hashtags.length})</div>
            <button
              onClick={copyHashtags}
              style={{
                padding: '8px 16px',
                background: copied ? '#16a34a' : '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {copied ? '✅ Copied!' : '📋 Copy All'}
            </button>
          </div>
          <div
            style={{
              padding: 16,
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: 12,
              fontSize: '0.9rem',
              lineHeight: 1.6,
              color: '#1e293b',
              wordBreak: 'break-word'
            }}
          >
            {hashtags.join(' ')}
          </div>
          <div style={{ marginTop: 12, fontSize: '0.8rem', color: '#64748b' }}>
            💡 Tip: Use 5-10 hashtags in your caption or first comment for best engagement.
          </div>
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">📝 Hashtag Strategy Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Hashtags Instagram ki backbone hain. Yeh posts ko discoverable banate hain aur algorithm ko batate hain ki aapki content kis audience ke liye relevant hai. 2026 mein hashtags ka smart use karna engagement aur reach badhane ka sabse effective tarika hai. Yeh guide aapko sikhaega ki hashtags kaise use karein for maximum impact.
          </p>

          <h3>1. Hashtag Types</h3>
          <p>
            Teen types ke hashtags hain jo har Instagram strategy ka part hona chahiye:
          </p>
          <ul>
            <li><strong>Popular/High-volume:</strong> Millions of posts (#love, #instagood) — reach badhata hai lekin competition jyada</li>
            <li><strong>Niche/Medium-volume:</strong> Thousands of posts (#fitnessmotivation, #foodblogger) — targeted audience</li>
            <li><strong>Branded/Low-volume:</strong> Custom hashtags (#YourBrandName) — community building ke liye</li>
          </ul>

          <h3>2. Kitne Hashtags Use Karein?</h3>
          <p>
            Research kehta hai ki 5-10 hashtags best perform karte hain. Zyada hashtags spam lagte hain aur engagement kam karte hain. Instagram ke algorithm ko lagta hai ki aap attention seek kar rahe hain.
          </p>
          <p>
            Best practice: 2-3 hashtags caption mein, baaki 5-7 hashtags first comment mein daalo.
          </p>

          <h3>3. Hashtag Placement</h3>
          <p>
            Hashtags ka placement important hai readability ke liye:
          </p>
          <ul>
            <li>✅ Caption ke end mein</li>
            <li>✅ First comment mein (hidden karne ke liye)</li>
            <li>❌ Caption ke beech mein (distraction banata hai)</li>
            <li>❌ Story mein (Stories mein hashtags kam effective)</li>
          </ul>

          <h3>4. Hashtag Research</h3>
          <p>
            Hashtags choose karne se pehle research zaroori hai:
          </p>
          <ul>
            <li>Instagram search mein hashtag type karo</li>
            <li>Posts count dekho (ideal: 10K-1M)</li>
            <li>Top posts dekho ki relevant hai ya nahi</li>
            <li>Related hashtags check karo</li>
          </ul>

          <h3>5. Mix Different Types</h3>
          <p>
            Hashtag mix karo for best results:
          </p>
          <ul>
            <li>1-2 popular hashtags for reach</li>
            <li>3-4 niche hashtags for targeted audience</li>
            <li>1-2 branded hashtags for community</li>
          </ul>

          <h3>6. Seasonal aur Trending Hashtags</h3>
          <p>
            Current trends ka leverage lo:
          </p>
          <ul>
            <li>#ReelsChallenge for viral content</li>
            <li>Seasonal: #SummerVibes, #WinterFashion</li>
            <li>Events: #Diwali, #NewYear</li>
            <li>Challenges: #DanceChallenge, #RecipeChallenge</li>
          </ul>

          <h3>7. Branded Hashtags</h3>
          <p>
            Apne unique hashtags banao:
          </p>
          <ul>
            <li>Brand name se related</li>
            <li>Easy to remember aur spell</li>
            <li>Encourage user-generated content</li>
            <li>Track karo ki kitne use kar rahe hain</li>
          </ul>

          <h3>8. Hashtag Performance Track Karo</h3>
          <p>
            Instagram Insights se dekho:
          </p>
          <ul>
            <li>Kaunse hashtags zyada reach de rahe hain</li>
            <li>Engagement rate compare karo</li>
            <li>Experiment karo aur best wale use karo</li>
          </ul>

          <h3>9. Avoid These Mistakes</h3>
          <ul>
            <li>Irrelevant hashtags use karna</li>
            <li>Same hashtags har post mein use karna</li>
            <li>Banned hashtags use karna</li>
            <li>Hashtags ko line breaks se hide karna (Instagram detects karta hai)</li>
          </ul>

          <h3>10. Hashtag Groups</h3>
          <p>
            Different content types ke liye different hashtag groups banao:
          </p>
          <ul>
            <li><strong>Food:</strong> #Foodie #InstaFood #Delicious #Yummy</li>
            <li><strong>Fitness:</strong> #Fitness #Workout #Gym #FitFam</li>
            <li><strong>Travel:</strong> #Travel #Wanderlust #Adventure #Explore</li>
            <li><strong>Fashion:</strong> #Fashion #Style #Outfit #FashionNova</li>
          </ul>

          <p>
            Yeh tool aapko smart hashtag combinations deta hai. Categories aur keywords ka use karke relevant hashtags generate karo. Practice karo, track karo, aur optimize karo — yahi hashtag success ka formula hai!
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}