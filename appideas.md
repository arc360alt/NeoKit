Here are more apps that run fully in the browser, grouped by how they'd fit with your current apps.

### Creative suite (fills Adobe CC gaps)
- **NeoAudio:** a multitrack audio editor and podcast tool, with noise reduction and loudness normalisation. It could reuse NeoCut's timeline code.
- **NeoMotion:** a motion graphics tool for animated titles, lower-thirds and logo reveals, using keyframes on NeoImage-style layers. Projects would export to video or Lottie and drop straight into NeoCut, similar to After Effects for Premiere.
- **NeoSlides:** a presentation editor that reuses NeoImage's canvas and layer model, with present mode, PDF export and PPTX export via pptxgenjs.
- **NeoPaint:** a raster painting app for illustration, with pressure-sensitive brushes, layers and pen-tablet support. It would give you a Procreate or Krita alternative and use NeoImage's brush engine.
- **NeoFont:** a small font editor and font tester, built with opentype.js.

### Utilities (very useful, quick to build)
- **NeoPDF:** the earlier top pick, covering merging, signing, annotating, compressing and redacting PDFs.
- **NeoConvert:** a converter for video, audio and images, plus batch resize, compress and EXIF stripping, using ffmpeg.wasm and libvips/squoosh codecs. It's like HandBrake in a tab, and NeoCut already loads ffmpeg.wasm.
- **NeoRecord:** a screen and webcam recorder that runs on the browser's MediaRecorder API, with trimming and a "send to NeoCut" button. It's a Loom alternative with nothing uploaded.
- **NeoPalette:** colour tools, including palette generation, contrast checking, gradients and an eyedropper, with palettes shared between apps.

### Organisation and writing (siblings for Scatter)
- **NeoWrite:** a distraction-free Markdown writer for docs, blogs and scripts, exporting to PDF, DOCX and HTML.
- **NeoBoard:** an infinite whiteboard for diagrams and flowcharts, like Excalidraw. Scatter may already cover some of this.
- **NeoSheets:** a lightweight spreadsheet and CSV editor for budgets and trackers. It's harder to build, but people would use it a lot.

### What would tie them together
- **A shared asset library:** a local IndexedDB "NeoKit Library" holding colours, fonts, logos and media, available in every app.
- **Cross-app handoff:** for example, a NeoImage design becomes a NeoCut title, a NeoMotion clip goes into NeoCut, and a NeoRecord capture goes into NeoCut.

On the same origin this needs no backend. On separate subdomains you'd need the File System Access API or a postMessage bridge. This handoff is the feature that would make NeoKit feel like a suite rather than a set of separate apps.

### What I'd prioritise
1. **NeoPDF:** the most useful to the most people.
2. **NeoConvert:** quick to build and reuses NeoCut's ffmpeg setup.
3. **NeoMotion or NeoAudio:** these deepen the creative suite and connect to NeoCut.

If you're looking for the next big project rather than a quick win, NeoMotion is the most distinctive of these. Few free tools do motion graphics well, and it fits naturally between NeoImage and NeoCut.