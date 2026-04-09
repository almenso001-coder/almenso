export function initializeAIBotTracking() {
  const userAgent = navigator.userAgent;
  const aiBotsDetected = {
    chatgpt: userAgent.includes('GPTBot'),
    perplexity: userAgent.includes('PerplexityBot'),
    claude: userAgent.includes('CCBot'),
    googlebot: userAgent.includes('Googlebot'),
    bingbot: userAgent.includes('Bingbot'),
  };

  Object.entries(aiBotsDetected).forEach(([botName, detected]) => {
    if (detected) {
      trackAIBotEvent(botName);
    }
  });

  return aiBotsDetected;
}

function trackAIBotEvent(botName) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'ai_bot_visit', {
      bot_type: botName,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      page_title: typeof document !== 'undefined' ? document.title : '',
      timestamp: new Date().toISOString()
    });
  }

  try {
    const aiVisits = JSON.parse(localStorage.getItem('ai_bot_visits') || '{}');
    aiVisits[botName] = (aiVisits[botName] || 0) + 1;
    localStorage.setItem('ai_bot_visits', JSON.stringify(aiVisits));
  } catch (e) {
    console.warn('Could not store AI bot visit:', e);
  }
}

export function getAIBotStats() {
  try {
    return JSON.parse(localStorage.getItem('ai_bot_visits') || '{}');
  } catch {
    return {};
  }
}
