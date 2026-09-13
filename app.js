// All schedules and outcomes are illustrative mock data.
const CURRENT_GROUP = 4;
const groupLabel = group => `Group ${group}`;

const events = [
  { id: 'volleyball', sport: "Women's Volleyball", opponent: 'UCLA', date: 'Sep 11', when: 'Friday · 6:30 PM', hours: '~2 hours', points: 30, rank: 1520, group: 3 },
  { id: 'soccer', sport: "Women's Soccer", opponent: 'Baylor', date: 'Sep 17', when: 'Thursday · 7:00 PM', hours: '~2 hours', points: 20, rank: 1635, group: 4 },
  { id: 'swimming', sport: 'Swimming & Diving', opponent: 'Utah', date: 'Sep 19', when: 'Saturday · 11:00 AM', hours: '~1.5 hours', points: 15, rank: 1690, group: 4 }
];

const fmt = number => number.toLocaleString('en-US');
const home = screen => `
  <nav class="page-nav" aria-label="Main navigation">
    <a href="#standing" ${screen === 'Standing' ? 'aria-current="page"' : ''}>${screen === 'Standing' ? '' : '← '}My ROC Standing</a>
    <span>${screen}</span>
  </nav>`;

function standing() {
  return `${home('Standing')}
    <h1 tabindex="-1">Know your priority.<br>Decide what’s worth your time.</h1>
    <p class="intro">See whether another event could get you earlier entry.</p>
    <section class="card standing-card" aria-label="Your priority for BYU vs. Notre Dame">
      <div class="rank-section">
        <span class="label">Your current rank</span>
        <div class="number">#1,842</div>
        <p class="secondary">of ~6,000 ROC pass holders</p>
        <div class="points"><span class="label">Priority points</span><strong>120 <small>pts</small></strong></div>
      </div>
      <div class="target-section">
        <div><span class="label">Target football game</span><h2>BYU vs. Notre Dame</h2></div>
        <div class="entry"><span class="label">Projected entry</span><strong>${groupLabel(CURRENT_GROUP)}</strong></div>
      </div>
      <p class="explanation">Three groups could enter ahead of you.</p>
    </section>
    <a class="primary" href="#opportunities">See Ways to Improve <span aria-hidden="true">→</span></a>`;
}

function opportunities() {
  return `${home('Compare Events')}
    <h1 tabindex="-1">Ways to improve</h1>
    <p class="intro">Compare the time you’d spend with the potential benefit.</p>
    <div class="events">
      ${events.map(event => `
        <article class="card event">
          <div class="event-heading">
            <div class="event-date" aria-label="${event.date}">
              <span>${event.date.split(' ')[0]}</span>
              <strong>${event.date.split(' ')[1]}</strong>
            </div>
            <div>
              <h2>${event.sport}<br>vs. ${event.opponent}</h2>
              <p class="secondary">${event.when}</p>
            </div>
          </div>
          <div class="event-tradeoff">
            <strong>${event.hours}</strong>
            <span class="potential">+${event.points} estimated pts</span>
          </div>
          <a class="primary" href="#impact/${event.id}" aria-label="See projected impact for ${event.sport} vs. ${event.opponent}">See Projected Impact <span aria-hidden="true">→</span></a>
        </article>`).join('')}
    </div>
    <p class="note">Sample September 2026 events. Time estimates exclude travel.</p>`;
}

function impact(event) {
  const earlier = event.group < CURRENT_GROUP;
  const gain = 1842 - event.rank;
  return `${home('Projected Impact')}
    <h1 tabindex="-1">Is this game worth your time?</h1>
    <p class="intro">Here’s what attending could mean for your ROC priority.</p>
    <div class="selection">
      <div><strong>${event.sport} vs. ${event.opponent}</strong><p>${event.date} · ${event.when}</p></div>
      <span class="time-pill">${event.hours}</span>
    </div>
    <div class="comparison">
      <section class="card compare-card" aria-label="Current standing">
        <div class="compare-label">Current standing</div>
        <div class="number">#1,842</div>
        <div class="group-value">${groupLabel(CURRENT_GROUP)}</div>
        <div class="compare-points">120 priority points</div>
      </section>
      <div class="compare-arrow" aria-hidden="true">→</div>
      <section class="card compare-card after" aria-label="Estimated standing if you attend">
        <div class="compare-label">If you attend · Estimate</div>
        <div class="number">~#${fmt(event.rank)}</div>
        <div class="group-value">${groupLabel(event.group)}</div>
        <div class="compare-points">${120 + event.points} priority points <strong>+${event.points} pts</strong></div>
      </section>
    </div>
    <section class="result">
      <div class="change">↑ ${gain}<span>estimated places</span></div>
      <div>
        <h2>${earlier ? 'Potentially earlier entry' : 'Better rank. Same entry group.'}</h2>
        <p>${earlier ? `Group ${CURRENT_GROUP} → Group ${event.group} for BYU vs. Notre Dame. Your ${event.hours} could move you one entry group earlier.` : `For BYU vs. Notre Dame, ${event.hours} could improve your rank, but may not get you earlier entry.`}</p>
      </div>
    </section>
    <a class="primary" href="#opportunities">Compare Another Event <span aria-hidden="true">→</span></a>`;
}

function render() {
  const hash = location.hash || '#standing';
  const selected = events.find(event => hash === `#impact/${event.id}`);
  const view = selected ? impact(selected) : hash === '#opportunities' ? opportunities() : standing();
  document.getElementById('app').innerHTML = view;
  document.title = `${selected ? 'Projected Impact' : hash === '#opportunities' ? 'Ways to Improve' : 'My ROC Standing'} · ROC Priority`;
  window.scrollTo(0, 0);
  if (location.hash) document.querySelector('h1').focus({ preventScroll: true });
}

window.addEventListener('hashchange', render);
render();
