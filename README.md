# ROC Priority — Student Prototype

A mobile-first, three-screen interactive prototype built with plain HTML, CSS, and JavaScript. No build step or package installation is required.

## Open in VS Code

1. Extract the ZIP.
2. In VS Code, choose **File → Open Folder** and select `roc-priority-vscode`, or open `roc-priority.code-workspace`.
3. Open `index.html` in your browser to use the prototype immediately.

For automatic refresh while editing, install the recommended **Live Server** extension, right-click `index.html`, and select **Open with Live Server**.

Alternatively, if Python 3 is installed, run this in the VS Code terminal:

```sh
python3 -m http.server 5500
```

Then open http://localhost:5500. Press Ctrl+C to stop the server.

## Files

- `index.html`: Page shell, branding, and metadata.
- `styles.css`: Navy theme, cards, typography, and mobile layouts.
- `app.js`: Mock event data, three screens, selected-event projections, and navigation.

## Screens

1. My ROC Standing: current rank, points, and target game entry group.
2. Ways to Improve: three events with time commitments and potential impact.
3. Projected Impact: before/after results for the selected event and a link back to compare another event.

Edit the `events` array at the top of `app.js` to change the sample opportunities and outcomes. Navigation uses URL hashes and supports browser back/forward.

Google Fonts loads over the internet; the interface falls back to sans-serif when unavailable. No backend, credentials, or official BYU data is included.

This is an independent student prototype, not an official BYU Athletics service. All schedules, attendance, points, rankings, and outcomes are mock data.
