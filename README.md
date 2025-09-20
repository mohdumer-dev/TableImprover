
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />

  
</head>
<body>
  
  <header>
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#0ea5a4"/>
      <path d="M6 9h12M6 13h12M6 17h8" stroke="#042c3c" stroke-width="1.2" stroke-linecap="round"/>
    </svg>
    <div>
      <h1>TableImprover</h1>
      <p class="lead">A small utility to enhance HTML/CSV tables: formatting, editing, exporting and UX improvements for data tables.</p>
    </div>
  </header>

  <section class="card">
    <h2>Features</h2>
    <ul>
      <li><strong>Auto-formatting</strong> — normalise column widths, trim whitespace, and clean cell values automatically.</li>
      <li><strong>Sortable columns</strong> — click a column header to sort ascending/descending.</li>
      <li><strong>Inline editing</strong> — double-click a cell to edit, with optional validation.</li>
      <li><strong>Filter & search</strong> — instant filtering across the whole table or per-column filters.</li>
      <li><strong>Pagination & virtual scroll</strong> — handles large datasets with pagination or virtualized rows for performance.</li>
      <li><strong>Import / Export</strong> — import CSV/TSV and export CSV, Excel (.xlsx) and copy-to-clipboard.</li>
      <li><strong>Column resize & reorder</strong> — drag to resize columns and drag headers to reorder.</li>
      <li><strong>Merge / split cells</strong> — basic tools for combining and splitting table cells.</li>
      <li><strong>Keyboard shortcuts</strong> — quick navigation and edit shortcuts (arrow keys, Enter, Esc).</li>
      <li><strong>Undo & redo</strong> — step back through edits while editing large tables.</li>
      <li><strong>Styling presets</strong> — quick themes (compact, readable, striped) for display and printing.</li>
      <li><strong>Accessibility</strong> — semantic table markup, focus states and ARIA attributes for screen readers.</li>
      <li><strong>Lightweight & modular</strong> — designed so you can use only the parts you need.</li>
    </ul>
  </section>

  <section class="card">
    <h2>Quick usage</h2>
    <p>Example: include the script and call <code>initTableImprover(tableElement, options)</code> to enable features on any &lt;table&gt;.</p>
    <pre><code>&lt;script src="tableimprover.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
  const table = document.querySelector('table');
  initTableImprover(table, {sortable:true, export:true, inlineEdit:true});
&lt;/script&gt;</code></pre>
  </section>

  <section class="card">
    <h2>Install</h2>
    <ul>
      <li>Download the single file <code>tableimprover.min.js</code> or install via npm (if published): <code>npm i tableimprover</code></li>
      <li>Or include from CDN: <code>&lt;script src="https://cdn.example.com/tableimprover.min.js"&gt;&lt;/script&gt;</code></li>
    </ul>
  </section>

  <section class="card">
    <h2>Contributing</h2>
    <p>If you want to add features, open an issue or a pull request. Keep changes small and include tests for new behavior.</p>
  </section>

  <footer>
    <p>Made with ❤️ — drop the HTML file into your repo as <span class="kbd">README.html</span> or copy contents into <span class="kbd">README.md</span> after converting to Markdown.</p>
  </footer>
</body>
</html>
