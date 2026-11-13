(function () {
  var ICONS = {
    java: '<svg viewBox="0 0 24 24"><path d="M8 3c2 2-2 3 0 6M13 3c2 2-2 3 0 6"/><path d="M5 12h12v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M17 13h1.5a1.5 1.5 0 0 1 0 3H17"/></svg>',
    spring: '<svg viewBox="0 0 24 24"><path d="M20 4C10 4 4 9 4 15c0 3 2 5 5 5 6 0 11-6 11-16z"/><path d="M4 20c3-5 7-8 12-10"/></svg>',
    db: '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>',
    api: '<svg viewBox="0 0 24 24"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 5l-4 14"/></svg>',
    tools: '<svg viewBox="0 0 24 24"><path d="M14 6a4 4 0 0 0 5 5l-9 9a2.1 2.1 0 0 1-3-3l9-9a4 4 0 0 0-2-2z"/></svg>'
  };
  var SKILLS = [
    { t: "Java", i: "java", items: [["Core Java", "Jv"], ["OOP Concepts", "OO"], ["Collections", "Co"], ["Exception Handling", "Ex"], ["Multithreading", "Th"], ["Java 8+ Features", "J8"]] },
    { t: "Spring and persistence", i: "spring", items: [["Spring Framework", "Sp"], ["Spring Boot", "SB"], ["Spring MVC", "MV"], ["Spring ORM", "OR"], ["Hibernate", "Hb"], ["Spring Data JPA", "JPA"], ["Spring Security", "Se"]] },
    { t: "Database", i: "db", items: [["MySQL", "My"], ["SQL", "SQL"], ["Joins", "⋈"]] },
    { t: "APIs and architecture", i: "api", items: [["RESTful APIs", "API"], ["Microservices", "µS"], ["Swagger / OpenAPI", "{}"]] },
    { t: "Tools and technologies", i: "tools", items: [["Git", "Git"], ["GitHub", "GH"], ["Maven", "Mvn"], ["Postman", "Pm"], ["IntelliJ IDEA", "IJ"], ["Apache Tomcat", "Tc"]] }
  ];
  var root = document.getElementById("skillGroups");
  SKILLS.forEach(function (g) {
    var div = document.createElement("div");
    div.className = "group";
    var h = document.createElement("h3");
    h.innerHTML = ICONS[g.i];
    h.appendChild(document.createTextNode(g.t));
    var cards = document.createElement("div");
    cards.className = "cards";
    g.items.forEach(function (it) {
      var c = document.createElement("div");
      c.className = "card";
      var tile = document.createElement("div");
      tile.className = "tile";
      tile.textContent = it[1];
      var n = document.createElement("span");
      n.className = "n";
      n.textContent = it[0];
      c.appendChild(tile); c.appendChild(n); cards.appendChild(c);
    });
    div.appendChild(h); div.appendChild(cards); root.appendChild(div);
  });

  // theme toggle
  var html = document.documentElement;
  document.getElementById("themeBtn").addEventListener("click", function () {
    var dark = html.getAttribute("data-theme") === "dark" ||
      (!html.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    html.setAttribute("data-theme", dark ? "light" : "dark");
  });

  // copy buttons
  document.querySelectorAll(".copy").forEach(function (b) {
    b.addEventListener("click", function () {
      var el = document.getElementById(b.getAttribute("data-copy"));
      var txt = el.textContent;
      var done = function () { b.textContent = "copied"; setTimeout(function () { b.textContent = "copy"; }, 1500); };
      try {
        navigator.clipboard.writeText(txt).then(done, function () { sel(el); });
      } catch (e) { sel(el); }
    });
  });
  function sel(el) {
    var r = document.createRange(); r.selectNodeContents(el);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }

  // contact form (preview only: no backend to receive messages)
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.name.value.trim(), email = form.email.value.trim(), msg = form.message.value.trim();
    status.className = "form-status err";
    if (!name || !msg) { status.textContent = "Please enter your name and a message."; return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { status.textContent = "Please enter a valid email address."; return; }
    status.textContent = "This form is not connected to an inbox yet, so nothing was sent. Please use the email address shown on this page.";
  });
})();
