# Vaibhav Bajpai — Academic Homepage

Personal website of Vaibhav Bajpai, PhD student at the Institute of Discrete Mathematics and Algebra,
TU Bergakademie Freiberg. A plain static site (HTML, CSS, vanilla JavaScript) styled after the ProofBench
site: Computer Modern type, black and white, hairline borders and one dark-red accent. There is no build step.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: introduction, research interests, links to every page, contact |
| `publications.html` | Papers and the Master's thesis |
| `research.html` | Research Collaboration: QEDAI, QEDSoft, Quantum_QED, AxiomVest |
| `benchmark.html` | Benchmark Evaluation: QEDRank |
| `author-editor.html` | Authored book, edited volumes, reviewing |
| `awards.html` | Awards & Recognitions, with certificates |
| `work.html` | Redirect from the old address to `publications.html` |

## Layout

```
assets/css/style.css   shared design
assets/js/main.js      Lean highlighting, scroll reveal, footer year
assets/fonts/          Computer Modern Unicode (CMU Serif, CMU Typewriter), woff2, SIL OFL (see OFL.txt)
assets/VB.png          portrait
assets/*.jpeg          certificates
```

## Preview locally

```sh
python -m http.server 8000
# open http://localhost:8000
```

## Deployment

Pushing to the `codex/academic-portfolio` branch deploys to GitHub Pages through `.github/workflows/pages.yml`.
