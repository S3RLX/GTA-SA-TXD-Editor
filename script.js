// Memuat komponen ikon Lucide
        lucide.createIcons();

        // Deklarasi Elemen DOM
        const txdFileInput = document.getElementById('txdFileInput');
        const mergeTxdInput = document.getElementById('mergeTxdInput');
        const mergeTxdLabel = document.getElementById('mergeTxdLabel');
        const downloadTxdBtn = document.getElementById('downloadTxdBtn');
        const exportSettingsBtn = document.getElementById('exportSettingsBtn');
        const addNewTextureBtn = document.getElementById('addNewTextureBtn');
        const exportAllBtn = document.getElementById('exportAllBtn');
        const textureCount = document.getElementById('textureCount');
        const textureList = document.getElementById('textureList');
        const emptyState = document.getElementById('emptyState');
        const workspace = document.getElementById('workspace');
        const searchBar = document.getElementById('searchBar');

        // Detail Aktif
        const activeTexNameInput = document.getElementById('activeTexNameInput');
        const activeAlphaNameInput = document.getElementById('activeAlphaNameInput');
        const activeTexIndexBadge = document.getElementById('activeTexIndexBadge');
        const activeImg = document.getElementById('activeImg');
        const previewContainer = document.getElementById('previewContainer');
        const exportPngBtn = document.getElementById('exportPngBtn');
        const importPngInput = document.getElementById('importPngInput');
        const deleteTextureBtn = document.getElementById('deleteTextureBtn');

        // Parameter Lanjutan Properti
        const rasterFormatSelect = document.getElementById('rasterFormatSelect');
        const techWidthInput = document.getElementById('techWidthInput');
        const techHeightInput = document.getElementById('techHeightInput');
        const techDepthSelect = document.getElementById('techDepthSelect');
        const techMipmapsInput = document.getElementById('techMipmapsInput');
        const wrapSSelect = document.getElementById('wrapSSelect');
        const wrapTSelect = document.getElementById('wrapTSelect');
        const applyPropertiesBtn = document.getElementById('applyPropertiesBtn');
        const forcePowerOfTwoBtn = document.getElementById('forcePowerOfTwoBtn');
        const autoGenMipmapBtn = document.getElementById('autoGenMipmapBtn');

        // Mipmaps Slider
        const mipmapLevelSlider = document.getElementById('mipmapLevelSlider');
        const mipmapLevelLabel = document.getElementById('mipmapLevelLabel');

        // Hex & Log
        const hexDumpContainer = document.getElementById('hexDumpContainer');

        // Palet Elemen
        const tabPaletteBtn = document.getElementById('tabPaletteBtn');
        const paletteSwatchesGrid = document.getElementById('paletteSwatchesGrid');
        const paletteColorPicker = document.getElementById('paletteColorPicker');
        const savePaletteColorBtn = document.getElementById('savePaletteColorBtn');

        // Batch Elements
        const batchPrefix = document.getElementById('batchPrefix');
        const batchFind = document.getElementById('batchFind');
        const batchReplace = document.getElementById('batchReplace');
        const applyBatchRenameBtn = document.getElementById('applyBatchRenameBtn');
        const batchScaleSelect = document.getElementById('batchScaleSelect');
        const applyBatchScaleBtn = document.getElementById('applyBatchScaleBtn');

        // Tab Management
        const tabEditBtn = document.getElementById('tabEditBtn');
        const tabBatchBtn = document.getElementById('tabBatchBtn');
        const tabHexBtn = document.getElementById('tabHexBtn');

        const tabEditContent = document.getElementById('tabEditContent');
        const tabPaletteContent = document.getElementById('tabPaletteContent');
        const tabBatchContent = document.getElementById('tabBatchContent');
        const tabHexContent = document.getElementById('tabHexContent');

        // Modal Elemen
        const addTextureModal = document.getElementById('addTextureModal');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const saveNewTextureBtn = document.getElementById('saveNewTextureBtn');
        const newTexName = document.getElementById('newTexName');
        const newTexAlpha = document.getElementById('newTexAlpha');
        const newTexFileInput = document.getElementById('newTexFileInput');

        // Modal Ekspor Elemen
        const exportSettingsModal = document.getElementById('exportSettingsModal');
        const closeExportModalBtn = document.getElementById('closeExportModalBtn');
        const exportAlphaHandling = document.getElementById('exportAlphaHandling');
        const exportPlatform = document.getElementById('exportPlatform');
        const exportRebuildMipmaps = document.getElementById('exportRebuildMipmaps');
        const memoryEstimator = document.getElementById('memoryEstimator');
        const estimatedSizeText = document.getElementById('estimatedSizeText');

        // State Struktur Data TXD Internasional
        let currentTxdFile = null;
        let textures = []; 
        let activeTextureIndex = -1;
        let selectedPaletteColorIndex = -1;

        // Tab Switching Logic
        function switchTab(activeTab, contentsToShow) {
            [tabEditBtn, tabPaletteBtn, tabBatchBtn, tabHexBtn].forEach(b => b.classList.remove('tab-active'));
            [tabEditContent, tabPaletteContent, tabBatchContent, tabHexContent].forEach(c => c.classList.add('hidden'));

            activeTab.classList.add('tab-active');
            contentsToShow.classList.remove('hidden');
        }

        tabEditBtn.addEventListener('click', () => switchTab(tabEditBtn, tabEditContent));
        tabPaletteBtn.addEventListener('click', () => switchTab(tabPaletteBtn, tabPaletteContent));
        tabBatchBtn.addEventListener('click', () => switchTab(tabBatchBtn, tabBatchContent));
        tabHexBtn.addEventListener('click', () => switchTab(tabHexBtn, tabHexContent));

        // Tampilkan Pesan Toast
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toastMsg');
            const toastIcon = document.getElementById('toastIcon');

            toastMsg.textContent = message;

            if (type === 'success') {
                toastIcon.className = "p-1 rounded-full bg-emerald-500 text-white";
                toastIcon.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
            } else {
                toastIcon.className = "p-1 rounded-full bg-rose-500 text-white";
                toastIcon.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
            }

            toast.classList.remove('translate-y-20', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');

            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
                toast.classList.remove('translate-y-0', 'opacity-100');
            }, 3000);
        }

        // Drag and Drop Area Event Handlers
        const dropZone = document.getElementById('dropZone');
        
        window.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        window.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
        });

        window.addEventListener('drop', async (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            
            const file = e.dataTransfer.files[0];
            if (file && file.name.endsWith('.txd')) {
                currentTxdFile = file;
                const arrayBuffer = await file.arrayBuffer();
                try {
                    parseTXD(arrayBuffer);
                    showToast("Arsip TXD berhasil diurai dari drop file!");
                    mergeTxdLabel.classList.remove('hidden');
                } catch (err) {
                    console.error(err);
                    showToast("Format TXD drop tidak valid.", "error");
                }
            }
        });

        // Event Latar Belakang Pratonton
        document.getElementById('bgDarkBtn').addEventListener('click', () => {
            previewContainer.className = "flex-1 min-h-[350px] max-h-[500px] rounded-xl flex items-center justify-center overflow-auto bg-[#030712] p-6 border border-slate-800/60";
        });
        document.getElementById('bgCheckBtn').addEventListener('click', () => {
            previewContainer.className = "flex-1 min-h-[350px] max-h-[500px] rounded-xl flex items-center justify-center overflow-auto checkerboard p-6 border border-slate-800/60";
        });

        // Parser File TXD (RenderWare Format)
        txdFileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            currentTxdFile = file;
            const arrayBuffer = await file.arrayBuffer();
            
            try {
                parseTXD(arrayBuffer);
                showToast("Arsip TXD berhasil diurai!");
                mergeTxdLabel.classList.remove('hidden');
            } catch (err) {
                console.error(err);
                showToast("Gagal membaca struktur file TXD.", "error");
            }
        });

        // Event listener Penggabung (Merge) TXD Kedua
        mergeTxdInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const arrayBuffer = await file.arrayBuffer();
            try {
                const initialLength = textures.length;
                parseTXD(arrayBuffer, true); // true = mode penggabung
                showToast(`Penggabungan Sukses! Ditambahkan ${textures.length - initialLength} tekstur baru.`);
            } catch (err) {
                console.error(err);
                showToast("Gagal menggabungkan arsip TXD.", "error");
            }
        });

        // DEKODER DXT1, DXT3, dan DXT5 dalam Pure JavaScript
        function decodeDXT(rgba, width, height, dxtFormat, data, offset) {
            const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
            let ptr = offset;
            const blockCountX = Math.ceil(width / 4);
            const blockCountY = Math.ceil(height / 4);

            for (let by = 0; by < blockCountY; by++) {
                for (let bx = 0; bx < blockCountX; bx++) {
                    if (ptr + (dxtFormat === 1 ? 8 : 16) > data.length) break;

                    let alphaVal = new Uint8Array(16);
                    alphaVal.fill(255);

                    if (dxtFormat === 3) {
                        for (let i = 0; i < 8; i++) {
                            const a = data[ptr + i];
                            alphaVal[i * 2] = (a & 0x0F) * 17;
                            alphaVal[i * 2 + 1] = ((a >> 4) & 0x0F) * 17;
                        }
                        ptr += 8;
                    } else if (dxtFormat === 5) {
                        const a0 = data[ptr];
                        const a1 = data[ptr + 1];
                        let alphaIndexWord = 0n;
                        for (let i = 0; i < 6; i++) {
                            alphaIndexWord |= BigInt(data[ptr + 2 + i]) << BigInt(i * 8);
                        }
                        
                        let alphas = new Uint8Array(8);
                        alphas[0] = a0;
                        alphas[1] = a1;
                        if (a0 > a1) {
                            alphas[2] = Math.floor((6 * a0 + 1 * a1) / 7);
                            alphas[3] = Math.floor((5 * a0 + 2 * a1) / 7);
                            alphas[4] = Math.floor((4 * a0 + 3 * a1) / 7);
                            alphas[5] = Math.floor((3 * a0 + 4 * a1) / 7);
                            alphas[6] = Math.floor((2 * a0 + 5 * a1) / 7);
                            alphas[7] = Math.floor((1 * a0 + 6 * a1) / 7);
                        } else {
                            alphas[2] = Math.floor((4 * a0 + 1 * a1) / 5);
                            alphas[3] = Math.floor((3 * a0 + 2 * a1) / 5);
                            alphas[4] = Math.floor((2 * a0 + 3 * a1) / 5);
                            alphas[5] = Math.floor((1 * a0 + 4 * a1) / 5);
                            alphas[6] = 0;
                            alphas[7] = 255;
                        }

                        for (let i = 0; i < 16; i++) {
                            const index = Number((alphaIndexWord >> BigInt(i * 3)) & 0x07n);
                            alphaVal[i] = alphas[index];
                        }
                        ptr += 8;
                    }

                    const color0 = view.getUint16(ptr, true);
                    const color1 = view.getUint16(ptr + 2, true);
                    const code = view.getUint32(ptr + 4, true);
                    ptr += 8;

                    const r0 = ((color0 >> 11) & 31) * 8.225;
                    const g0 = ((color0 >> 5) & 63) * 4.047;
                    const b0 = (color0 & 31) * 8.225;

                    const r1 = ((color1 >> 11) & 31) * 8.225;
                    const g1 = ((color1 >> 5) & 63) * 4.047;
                    const b1 = (color1 & 31) * 8.225;

                    let r = new Uint8Array(4);
                    let g = new Uint8Array(4);
                    let b = new Uint8Array(4);
                    let a = new Uint8Array(4);

                    r[0] = r0; g[0] = g0; b[0] = b0; a[0] = 255;
                    r[1] = r1; g[1] = g1; b[1] = b1; a[1] = 255;

                    if (dxtFormat === 1) {
                        if (color0 > color1) {
                            r[2] = (2 * r0 + r1) / 3;
                            g[2] = (2 * g0 + g1) / 3;
                            b[2] = (2 * b0 + b1) / 3;
                            a[2] = 255;

                            r[3] = (r0 + 2 * r1) / 3;
                            g[3] = (g0 + 2 * g1) / 3;
                            b[3] = (b0 + 2 * b1) / 3;
                            a[3] = 255;
                        } else {
                            r[2] = (r0 + r1) / 2;
                            g[2] = (g0 + g1) / 2;
                            b[2] = (b0 + b1) / 2;
                            a[2] = 255;

                            r[3] = 0; g[3] = 0; b[3] = 0; a[3] = 0;
                        }
                    } else {
                        r[2] = (2 * r0 + r1) / 3;
                        g[2] = (2 * g0 + g1) / 3;
                        b[2] = (2 * b0 + b1) / 3;
                        a[2] = 255;

                        r[3] = (r0 + 2 * r1) / 3;
                        g[3] = (g0 + 2 * g1) / 3;
                        b[3] = (b0 + 2 * b1) / 3;
                        a[3] = 255;
                    }

                    for (let y = 0; y < 4; y++) {
                        for (let x = 0; x < 4; x++) {
                            const pixelX = bx * 4 + x;
                            const pixelY = by * 4 + y;

                            if (pixelX < width && pixelY < height) {
                                const index = (code >> ((y * 4 + x) * 2)) & 3;
                                const outIdx = (pixelY * width + pixelX) * 4;

                                rgba[outIdx] = r[index];
                                rgba[outIdx + 1] = g[index];
                                rgba[outIdx + 2] = b[index];
                                rgba[outIdx + 3] = (dxtFormat === 1) ? a[index] : alphaVal[y * 4 + x];
                            }
                        }
                    }
                }
            }
        }

        // Dekoder BGRA 32-bit Raw
        function decodeBGRA32(rgba, width, height, data, offset) {
            let ptr = offset;
            for (let i = 0; i < width * height; i++) {
                if (ptr + 4 > data.length) break;
                rgba[i * 4] = data[ptr + 2];     // R
                rgba[i * 4 + 1] = data[ptr + 1]; // G
                rgba[i * 4 + 2] = data[ptr];     // B
                rgba[i * 4 + 3] = data[ptr + 3]; // A
                ptr += 4;
            }
        }

        // Dekoder BGR 24-bit Raw
        function decodeBGR24(rgba, width, height, data, offset) {
            let ptr = offset;
            for (let i = 0; i < width * height; i++) {
                if (ptr + 3 > data.length) break;
                rgba[i * 4] = data[ptr + 2];     // R
                rgba[i * 4 + 1] = data[ptr + 1]; // G
                rgba[i * 4 + 2] = data[ptr];     // B
                rgba[i * 4 + 3] = 255;           // A
                ptr += 3;
            }
        }

        // Dekoder PAL8 (8-bit Palette)
        function decodePAL8(rgba, width, height, data, offset, palette) {
            let ptr = offset;
            for (let i = 0; i < width * height; i++) {
                if (ptr >= data.length) break;
                const idx = data[ptr];
                const palPtr = idx * 4;
                if (palPtr + 4 <= palette.length) {
                    rgba[i * 4] = palette[palPtr + 2];     // R
                    rgba[i * 4 + 1] = palette[palPtr + 1]; // G
                    rgba[i * 4 + 2] = palette[palPtr];     // B
                    rgba[i * 4 + 3] = palette[palPtr + 3]; // A
                } else {
                    rgba[i * 4] = 0; rgba[i * 4 + 1] = 0; rgba[i * 4 + 2] = 0; rgba[i * 4 + 3] = 255;
                }
                ptr++;
            }
        }

        // Generate URL Gambar PNG dari Uint8ClampedArray
        function createPngUrl(width, height, rgbaArray) {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            const imgData = ctx.createImageData(width, height);
            imgData.data.set(rgbaArray);
            ctx.putImageData(imgData, 0, 0);
            return canvas.toDataURL('image/png');
        }

        // Pengurai Utama TXD (RenderWare Binary Parser)
        function parseTXD(buffer, isMergeMode = false) {
            const view = new DataView(buffer);
            const bytes = new Uint8Array(buffer);
            
            let offset = 0;

            const mainType = view.getUint32(offset, true);
            const mainSize = view.getUint32(offset + 4, true);
            
            if (mainType !== 0x16) {
                throw new Error("Bukan format RenderWare yang valid.");
            }

            offset += 12; 

            const structType = view.getUint32(offset, true);
            const structSize = view.getUint32(offset + 4, true);
            
            if (structType !== 0x01) {
                throw new Error("Data Struct kosong atau rusak.");
            }

            const numTextures = view.getUint16(offset + 12, true);
            offset += 12 + structSize;

            if (!isMergeMode) {
                textures = [];
            }

            const startIdx = textures.length;

            for (let i = 0; i < numTextures; i++) {
                if (offset >= buffer.byteLength) break;

                const nativeType = view.getUint32(offset, true);
                const nativeSize = view.getUint32(offset + 4, true);

                if (nativeType !== 0x15) break; 

                const chunkStart = offset;
                const innerStructOffset = offset + 12;

                let nameOffset = innerStructOffset + 12 + 8; 
                
                // Ambil Nama Tekstur asli
                let name = "";
                for (let k = 0; k < 32; k++) {
                    const charCode = bytes[nameOffset + k];
                    if (charCode === 0) break;
                    if (charCode >= 32 && charCode <= 126) {
                        name += String.fromCharCode(charCode);
                    }
                }
                name = name.trim();

                // Ambil Nama Alpha Mask asli
                let alphaName = "";
                let alphaNameOffset = nameOffset + 32; 
                for (let k = 0; k < 32; k++) {
                    const charCode = bytes[alphaNameOffset + k];
                    if (charCode === 0) break;
                    if (charCode >= 32 && charCode <= 126) {
                        alphaName += String.fromCharCode(charCode);
                    }
                }
                alphaName = alphaName.trim();

                const rasterFormat = view.getUint32(innerStructOffset + 12 + 72, true);
                const d3dFormat = view.getUint32(innerStructOffset + 12 + 76, true); 
                const width = view.getUint16(innerStructOffset + 12 + 80, true);
                const height = view.getUint16(innerStructOffset + 12 + 82, true);
                const depth = bytes[innerStructOffset + 12 + 84];
                const mipmaps = bytes[innerStructOffset + 12 + 85];
                const typeCode = bytes[innerStructOffset + 12 + 86]; 
                const compression = bytes[innerStructOffset + 12 + 87]; 

                const wrapS = (rasterFormat & 0x10000) ? 3 : 1; 
                const wrapT = (rasterFormat & 0x20000) ? 3 : 1;

                const chunkRawBytes = bytes.slice(chunkStart, chunkStart + 12 + nativeSize);

                let decodedRgba = null;
                let activePalette = null;

                // Proses decoding gambar asli dari binary chunk
                let previewUrl = "";
                try {
                    const hasPalette = (depth <= 8);
                    const paletteSize = hasPalette ? (1 << depth) * 4 : 0;
                    const paletteOffset = innerStructOffset + 12 + 88;
                    const pixelSizeOffset = paletteOffset + paletteSize;
                    
                    if (pixelSizeOffset + 4 <= bytes.length) {
                        const m0_size = view.getUint32(pixelSizeOffset, true);
                        const pixelDataOffset = pixelSizeOffset + 4;
                        
                        if (pixelDataOffset + m0_size <= bytes.length) {
                            decodedRgba = new Uint8ClampedArray(width * height * 4);
                            if (d3dFormat === 0x31545844) { // DXT1
                                decodeDXT(decodedRgba, width, height, 1, bytes, pixelDataOffset);
                            } else if (d3dFormat === 0x33545844) { // DXT3
                                decodeDXT(decodedRgba, width, height, 3, bytes, pixelDataOffset);
                            } else if (d3dFormat === 0x35545844) { // DXT5
                                decodeDXT(decodedRgba, width, height, 5, bytes, pixelDataOffset);
                            } else if (depth === 32) {
                                decodeBGRA32(decodedRgba, width, height, bytes, pixelDataOffset);
                            } else if (depth === 24) {
                                decodeBGR24(decodedRgba, width, height, bytes, pixelDataOffset);
                            } else if (depth === 8 && hasPalette) {
                                activePalette = bytes.slice(paletteOffset, paletteOffset + paletteSize);
                                decodePAL8(decodedRgba, width, height, bytes, pixelDataOffset, activePalette);
                            } else {
                                throw new Error("Format dekoder belum terdukung.");
                            }
                            previewUrl = createPngUrl(width, height, decodedRgba);
                        }
                    }
                } catch (err) {
                    console.warn(`Fallback Generator pada tekstur '${name}':`, err);
                    previewUrl = generateAwesomeTexture(width, height, name);
                }

                textures.push({
                    index: startIdx + i,
                    name: name,
                    alphaName: alphaName,
                    width: width,
                    height: height,
                    depth: depth,
                    mipmaps: mipmaps,
                    d3dFormat: d3dFormat,
                    rasterFormat: rasterFormat,
                    compression: compression,
                    wrapS: wrapS,
                    wrapT: wrapT,
                    originalChunk: chunkRawBytes,
                    previewUrl: previewUrl,
                    newPixels: decodedRgba, 
                    palette: activePalette, 
                    mipmapList: [{ width: width, height: height, url: previewUrl, pixels: decodedRgba }] // Menampung mipmap
                });

                offset += 12 + nativeSize;
            }

            activeTextureIndex = textures.length > 0 ? 0 : -1;
            renderTextureList();
            updateEstimatedSize();
            
            exportSettingsBtn.disabled = false;
            addNewTextureBtn.disabled = false;
            exportAllBtn.disabled = false;
            memoryEstimator.classList.remove('hidden');
        }

        // Estimator Ukuran Memori TXD Real-Time
        function updateEstimatedSize() {
            let totalBytes = 12 + 16; // Header Utama & Struct Info
            textures.forEach(tex => {
                let bytesPerPixel = (tex.depth === 24) ? 3 : 4;
                if (tex.depth === 8) bytesPerPixel = 1;
                
                let mipSize = 0;
                let curW = tex.width;
                let curH = tex.height;
                
                for (let i = 0; i < tex.mipmaps; i++) {
                    mipSize += 4 + (curW * curH * bytesPerPixel);
                    curW = Math.max(1, Math.floor(curW / 2));
                    curH = Math.max(1, Math.floor(curH / 2));
                }

                const paletteSize = (tex.depth <= 8) ? (1 << tex.depth) * 4 : 0;
                const nativeSize = 12 + 12 + 88 + paletteSize + mipSize + 12;
                totalBytes += 12 + nativeSize;
            });

            const kb = (totalBytes / 1024).toFixed(2);
            estimatedSizeText.textContent = `${kb} KB`;
        }

        // Generator Tekstur Cadangan Futuristik
        function generateAwesomeTexture(width, height, name) {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#f97316');
            gradient.addColorStop(1, '#6366f1');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 2;
            ctx.strokeRect(4, 4, width - 8, height - 8);

            ctx.fillStyle = '#ffffff';
            const fontSize = Math.max(10, Math.floor(width / 11));
            ctx.font = `bold ${fontSize}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(name.substring(0, 16), width / 2, height / 2);

            return canvas.toDataURL('image/png');
        }

        // Logika Auto-Mipmap Generator Dinamis (Canvas Scaling)
        function generateDynamicMipmaps(rgba, width, height, levels) {
            const generated = [];
            // Level 0
            generated.push({
                width: width,
                height: height,
                url: createPngUrl(width, height, rgba),
                pixels: rgba
            });

            let curW = width;
            let curH = height;
            let curRGBA = rgba;

            for (let i = 1; i < levels; i++) {
                curW = Math.max(1, Math.floor(curW / 2));
                curH = Math.max(1, Math.floor(curH / 2));

                const srcCanvas = document.createElement('canvas');
                srcCanvas.width = generated[i-1].width;
                srcCanvas.height = generated[i-1].height;
                const srcCtx = srcCanvas.getContext('2d');
                const srcData = srcCtx.createImageData(generated[i-1].width, generated[i-1].height);
                srcData.data.set(generated[i-1].pixels);
                srcCtx.putImageData(srcData, 0, 0);

                const dstCanvas = document.createElement('canvas');
                dstCanvas.width = curW;
                dstCanvas.height = curH;
                const dstCtx = dstCanvas.getContext('2d');
                dstCtx.drawImage(srcCanvas, 0, 0, curW, curH);

                const dstData = dstCtx.getImageData(0, 0, curW, curH);
                curRGBA = dstData.data;

                generated.push({
                    width: curW,
                    height: curH,
                    url: dstCanvas.toDataURL('image/png'),
                    pixels: curRGBA
                });
            }

            return generated;
        }

        // Render Daftar Tekstur
        function renderTextureList() {
            const query = searchBar.value.toLowerCase().trim();
            textureList.innerHTML = '';

            const filteredTextures = textures.filter(t => t.name.toLowerCase().includes(query));
            textureCount.textContent = `Total: ${filteredTextures.length} Item`;

            if (filteredTextures.length === 0) {
                if (textures.length === 0) {
                    emptyState.classList.remove('hidden');
                    workspace.classList.add('hidden');
                } else {
                    textureList.innerHTML = `<div class="text-center py-8 text-xs text-slate-600">Tidak ada kecocokan hasil pencarian.</div>`;
                }
                return;
            }

            emptyState.classList.add('hidden');
            workspace.classList.remove('hidden');

            filteredTextures.forEach((tex) => {
                const isSelected = activeTextureIndex === tex.index;
                const btn = document.createElement('button');
                btn.className = `w-full text-left p-2.5 rounded-xl flex items-center gap-3 transition-all duration-150 ${
                    isSelected ? 'bg-gradient-to-r from-orange-600 to-violet-600 text-white font-semibold glow-orange' : 'hover:bg-[#0d1321]/80 text-slate-300'
                }`;
                btn.onclick = () => selectTexture(tex.index);

                const thumb = document.createElement('img');
                thumb.src = tex.previewUrl;
                thumb.className = "w-10 h-10 object-cover rounded-lg border border-slate-800 flex-shrink-0 bg-black";

                const wrapper = document.createElement('div');
                wrapper.className = "truncate flex-1";

                const nameDiv = document.createElement('div');
                nameDiv.className = "truncate text-xs font-bold tracking-wide";
                nameDiv.textContent = tex.name || "UNNAMED";

                const metaDiv = document.createElement('div');
                metaDiv.className = `text-[10px] mt-0.5 font-mono ${isSelected ? 'text-orange-100' : 'text-slate-500'}`;
                metaDiv.textContent = `${tex.width}x${tex.height} (${tex.depth}b)`;

                wrapper.appendChild(nameDiv);
                wrapper.appendChild(metaDiv);
                btn.appendChild(thumb);
                btn.appendChild(wrapper);

                textureList.appendChild(btn);
            });

            if (activeTextureIndex !== -1) {
                updateActiveDetailsPanel();
            }
        }

        searchBar.addEventListener('input', renderTextureList);

        function selectTexture(index) {
            activeTextureIndex = index;
            renderTextureList();
        }

        // Tampilkan Detail & Analisis Properti Ke Panel Editor
        function updateActiveDetailsPanel() {
            const tex = textures[activeTextureIndex];
            if (!tex) return;

            activeTexNameInput.value = tex.name;
            activeAlphaNameInput.value = tex.alphaName;
            activeTexIndexBadge.textContent = `#${tex.index}`;
            activeImg.src = tex.previewUrl;

            techWidthInput.value = tex.width;
            techHeightInput.value = tex.height;
            techMipmapsInput.value = tex.mipmaps;
            techDepthSelect.value = tex.depth;
            wrapSSelect.value = tex.wrapS;
            wrapTSelect.value = tex.wrapT;

            if (tex.d3dFormat === 0x31545844) rasterFormatSelect.value = "dxt1";
            else if (tex.d3dFormat === 0x33545844) rasterFormatSelect.value = "dxt3";
            else if (tex.d3dFormat === 0x35545844) rasterFormatSelect.value = "dxt5";
            else if (tex.depth === 32) rasterFormatSelect.value = "rgba8";
            else rasterFormatSelect.value = "rgb8";

            // Konfigurasi slider Mipmap Viewer
            if (tex.mipmapList && tex.mipmapList.length > 1) {
                mipmapLevelSlider.disabled = false;
                mipmapLevelSlider.max = tex.mipmapList.length - 1;
                mipmapLevelSlider.value = 0;
                mipmapLevelLabel.textContent = `Lvl 0 (${tex.width}x${tex.height})`;
            } else {
                mipmapLevelSlider.disabled = true;
                mipmapLevelSlider.max = 0;
                mipmapLevelSlider.value = 0;
                mipmapLevelLabel.textContent = "Lvl 0 (No Mipmaps)";
            }

            // Integrasi Fitur Khusus Palet PAL8 8-bit
            if (tex.depth === 8 && tex.palette) {
                tabPaletteBtn.classList.remove('hidden');
                renderPaletteGrid(tex.palette);
            } else {
                tabPaletteBtn.classList.add('hidden');
                if (tabPaletteBtn.classList.contains('tab-active')) {
                    switchTab(tabEditBtn, tabEditContent);
                }
            }

            generateHexView(tex.originalChunk);
        }

        // Slider Mipmap Viewer
        mipmapLevelSlider.addEventListener('input', (e) => {
            const tex = textures[activeTextureIndex];
            if (!tex || !tex.mipmapList) return;

            const lvl = parseInt(e.target.value, 10);
            const m = tex.mipmapList[lvl];
            if (m) {
                activeImg.src = m.url;
                mipmapLevelLabel.textContent = `Lvl ${lvl} (${m.width}x${m.height})`;
            }
        });

        // Paksa Power of Two (Kestabilan GTA Engine)
        function isPowerOfTwo(x) {
            return (x & (x - 1)) === 0;
        }

        function getNearestPowerOfTwo(x) {
            return Math.pow(2, Math.round(Math.log(x) / Math.log(2)));
        }

        forcePowerOfTwoBtn.addEventListener('click', () => {
            const w = parseInt(techWidthInput.value, 10);
            const h = parseInt(techHeightInput.value, 10);

            const newW = getNearestPowerOfTwo(w);
            const newH = getNearestPowerOfTwo(h);

            techWidthInput.value = newW;
            techHeightInput.value = newH;
            showToast(`Resolusi disesuaikan ke ${newW}x${newH} piksel.`);
            updateEstimatedSize();
        });

        // Tombol Auto-Generate Mipmaps
        autoGenMipmapBtn.addEventListener('click', () => {
            const w = parseInt(techWidthInput.value, 10);
            const maxLevels = Math.floor(Math.log2(w)) + 1;
            techMipmapsInput.value = Math.min(maxLevels, 6); // Rata-rata optimal di game adalah 6 level
            showToast(`Tingkatan Mipmaps disesuaikan ke ${techMipmapsInput.value} level.`);
            updateEstimatedSize();
        });

        // Tampilkan Kode Hexadecimal (Hex View)
        function generateHexView(uint8Array) {
            const limit = Math.min(uint8Array.length, 1024); 
            let output = "";
            let hexLine = "";
            let asciiLine = "";

            for (let i = 0; i < limit; i++) {
                if (i % 16 === 0) {
                    if (i > 0) output += `${hexLine.padEnd(48, ' ')}  |${asciiLine}|\n`;
                    output += `${i.toString(16).toUpperCase().padStart(8, '0')}: `;
                    hexLine = "";
                    asciiLine = "";
                }
                
                const hexVal = uint8Array[i].toString(16).toUpperCase().padStart(2, '0');
                hexLine += `${hexVal} `;

                const char = uint8Array[i];
                asciiLine += (char >= 32 && char <= 126) ? String.fromCharCode(char) : '.';
            }

            if (hexLine) {
                output += `${hexLine.padEnd(48, ' ')}  |${asciiLine}|\n`;
            }

            hexDumpContainer.textContent = output;
        }

        // Render Grid Palet 256 Warna (PAL8)
        function renderPaletteGrid(paletteBytes) {
            paletteSwatchesGrid.innerHTML = '';
            for (let i = 0; i < paletteBytes.length / 4; i++) {
                const r = paletteBytes[i * 4 + 2];
                const g = paletteBytes[i * 4 + 1];
                const b = paletteBytes[i * 4];
                const a = paletteBytes[i * 4 + 3];

                const colorHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

                const swatch = document.createElement('div');
                swatch.className = `w-full aspect-square rounded-md border border-slate-800 cursor-pointer transition transform hover:scale-125 ${
                    selectedPaletteColorIndex === i ? 'ring-2 ring-orange-500' : ''
                }`;
                swatch.style.backgroundColor = `rgba(${r},${g},${b},${a / 255})`;
                swatch.title = `Index #${i}: rgba(${r},${g},${b},${a})`;
                
                swatch.addEventListener('click', () => {
                    selectedPaletteColorIndex = i;
                    paletteColorPicker.value = colorHex;
                    renderPaletteGrid(paletteBytes); // Update status ring aktif
                });

                paletteSwatchesGrid.appendChild(swatch);
            }
        }

        // Simpan Warna Baru ke Palet
        savePaletteColorBtn.addEventListener('click', () => {
            const tex = textures[activeTextureIndex];
            if (!tex || selectedPaletteColorIndex === -1 || !tex.palette) {
                showToast("Sila pilih warna palet dari grid di atas!", "error");
                return;
            }

            const hex = paletteColorPicker.value;
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);

            // Perbarui data biner palet asli (BGRA)
            tex.palette[selectedPaletteColorIndex * 4] = b;
            tex.palette[selectedPaletteColorIndex * 4 + 1] = g;
            tex.palette[selectedPaletteColorIndex * 4 + 2] = r;
            tex.palette[selectedPaletteColorIndex * 4 + 3] = 255; 

            // Redecoding gambar baru dengan palet baru secara real-time
            if (tex.newPixels) {
                const rgba = new Uint8ClampedArray(tex.width * tex.height * 4);
                decodePAL8(rgba, tex.width, tex.height, tex.newPixels, 0, tex.palette);
                tex.previewUrl = createPngUrl(tex.width, tex.height, rgba);
            }

            renderPaletteGrid(tex.palette);
            updateActiveDetailsPanel();
            showToast("Warna palet biner berhasil diubah!");
        });

        // Event Klik Terapkan Properti & Struktur
        applyPropertiesBtn.addEventListener('click', () => {
            if (activeTextureIndex === -1) return;

            const tex = textures[activeTextureIndex];
            
            let cleanName = activeTexNameInput.value.trim().replace(/[^a-zA-Z0-9_\-]/g, "");
            if (cleanName.length > 31) cleanName = cleanName.substring(0, 31);
            if (!cleanName) {
                showToast("Nama tekstur tidak boleh kosong!", "error");
                return;
            }

            // Fitur Auto-Replace saat ganti nama: Periksa apakah nama baru sudah ada di daftar lain
            const duplicateIndex = textures.findIndex((t, idx) => t.name === cleanName && idx !== activeTextureIndex);
            if (duplicateIndex !== -1) {
                if (confirm(`Tekstur dengan nama "${cleanName}" sudah ada. Apakah Anda ingin menimpanya?`)) {
                    // Tindakan Auto-Replace: Salin data pixel aktif ke target duplikat, lalu hapus tekstur aktif
                    const targetTex = textures[duplicateIndex];
                    targetTex.newPixels = tex.newPixels || tex.originalChunk;
                    targetTex.width = tex.width;
                    targetTex.height = tex.height;
                    targetTex.previewUrl = tex.previewUrl;
                    
                    textures.splice(activeTextureIndex, 1);
                    textures.forEach((t, i) => t.index = i); // Atur ulang indeks list
                    activeTextureIndex = duplicateIndex;
                    
                    showToast("Sistem menimpa tekstur duplikat secara otomatis!");
                    renderTextureList();
                    updateEstimatedSize();
                    return;
                }
            }

            tex.name = cleanName;
            tex.alphaName = activeAlphaNameInput.value.trim().substring(0, 31);
            tex.width = parseInt(techWidthInput.value, 10) || 256;
            tex.height = parseInt(techHeightInput.value, 10) || 256;
            tex.mipmaps = parseInt(techMipmapsInput.value, 10) || 1;
            tex.depth = parseInt(techDepthSelect.value, 10) || 32;
            tex.wrapS = parseInt(wrapSSelect.value, 10);
            tex.wrapT = parseInt(wrapTSelect.value, 10);

            const formatVal = rasterFormatSelect.value;
            if (formatVal === "dxt1") tex.d3dFormat = 0x31545844;
            else if (formatVal === "dxt3") tex.d3dFormat = 0x33545844;
            else if (formatVal === "dxt5") tex.d3dFormat = 0x35545844;
            else tex.d3dFormat = 0;

            // Jika ada data pixel, buat mipmap biner tiruan secara visual
            if (tex.newPixels) {
                tex.mipmapList = generateDynamicMipmaps(tex.newPixels, tex.width, tex.height, tex.mipmaps);
                tex.previewUrl = tex.mipmapList[0].url;
            }

            renderTextureList();
            updateEstimatedSize();
            showToast("Sifat dan parameter biner RenderWare berhasil diperbarui!");
        });

        // Penggantian Gambar (Import PNG dengan Auto-Replace)
        importPngInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file || activeTextureIndex === -1) return;

            // Cek nama berkas (jika mengimpor file PNG eksternal dengan nama tertentu)
            let importedName = file.name.split('.').slice(0, -1).join('.').toLowerCase().replace(/[^a-zA-Z0-9_\-]/g, "");
            
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    let tex = textures[activeTextureIndex];
                    
                    // Fitur Auto-Replace: Jika nama file PNG yang diimpor sama dengan item lain di daftar
                    const targetIndex = textures.findIndex(t => t.name.toLowerCase() === importedName);
                    if (targetIndex !== -1 && targetIndex !== activeTextureIndex) {
                        if (confirm(`Tekstur dengan nama "${importedName}" terdeteksi di index #${targetIndex}. Ganti tekstur tersebut secara otomatis?`)) {
                            tex = textures[targetIndex];
                            activeTextureIndex = targetIndex;
                        }
                    }

                    tex.width = img.width;
                    tex.height = img.height;

                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    const imgData = ctx.getImageData(0, 0, img.width, img.height);
                    
                    tex.newPixels = imgData.data; 

                    // Konfigurasi standar biner modifikasi GTA SA agar tidak corrupt
                    tex.depth = 32;
                    tex.d3dFormat = 0;
                    tex.rasterFormat = 0x1500; // RGBA 8888
                    tex.compression = 0;
                    tex.mipmaps = 4; // Berikan mipmap default level 4 demi kehalusan rendering dalam game

                    // Auto-Generate tingkatan Mipmaps untuk visual preview slider
                    tex.mipmapList = generateDynamicMipmaps(tex.newPixels, tex.width, tex.height, tex.mipmaps);
                    tex.previewUrl = tex.mipmapList[0].url;

                    updateActiveDetailsPanel();
                    renderTextureList();
                    updateEstimatedSize();
                    showToast(`Tekstur berhasil diimpor dengan ${tex.mipmaps} tingkat Mipmaps.`);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });

        // Batch Renamer Massal
        applyBatchRenameBtn.addEventListener('click', () => {
            if (textures.length === 0) return;

            const prefix = batchPrefix.value.trim();
            const findStr = batchFind.value.trim();
            const repStr = batchReplace.value.trim();

            let count = 0;
            textures.forEach(tex => {
                let initialName = tex.name;
                if (prefix) {
                    tex.name = prefix + tex.name;
                }
                if (findStr) {
                    tex.name = tex.name.split(findStr).join(repStr);
                }
                if (tex.name !== initialName) {
                    count++;
                }
            });

            renderTextureList();
            updateEstimatedSize();
            showToast(`Batch Ganti Nama Sukses! ${count} tekstur diubah.`);
        });

        // Batch Downscaler / Upscaler
        applyBatchScaleBtn.addEventListener('click', () => {
            if (textures.length === 0) return;

            const scale = parseFloat(batchScaleSelect.value);
            let count = 0;

            textures.forEach(tex => {
                const oldW = tex.width;
                const oldH = tex.height;

                tex.width = Math.max(4, getNearestPowerOfTwo(Math.floor(tex.width * scale)));
                tex.height = Math.max(4, getNearestPowerOfTwo(Math.floor(tex.height * scale)));

                if (tex.width !== oldW || tex.height !== oldH) {
                    count++;
                }
            });

            renderTextureList();
            updateEstimatedSize();
            showToast(`Batch Skalasi Sukses! ${count} tekstur disesuaikan.`);
        });

        // Tambah Tekstur Baru - Modal Logic
        addNewTextureBtn.addEventListener('click', () => {
            newTexName.value = '';
            newTexAlpha.value = '';
            newTexFileInput.value = '';
            addTextureModal.classList.remove('hidden');
        });

        closeModalBtn.addEventListener('click', () => {
            addTextureModal.classList.add('hidden');
        });

        saveNewTextureBtn.addEventListener('click', () => {
            const nameVal = newTexName.value.trim().replace(/[^a-zA-Z0-9_\-]/g, "");
            const alphaVal = newTexAlpha.value.trim().replace(/[^a-zA-Z0-9_\-]/g, "");
            const file = newTexFileInput.files[0];

            if (!nameVal) {
                showToast("Nama tekstur wajib diisi!", "error");
                return;
            }

            if (!file) {
                showToast("Sila pilih fail imej PNG!", "error");
                return;
            }

            // Proteksi & Auto Replace pada modal tambah tekstur baru
            const duplicateIndex = textures.findIndex(t => t.name.toLowerCase() === nameVal.toLowerCase());
            if (duplicateIndex !== -1) {
                if (!confirm(`Nama tekstur "${nameVal}" sudah ada di index #${duplicateIndex}. Ganti tekstur secara otomatis?`)) {
                    return;
                }
            }

            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    const imgData = ctx.getImageData(0, 0, img.width, img.height);

                    const newTex = {
                        name: nameVal,
                        alphaName: alphaVal || "",
                        width: img.width,
                        height: img.height,
                        depth: 32,
                        mipmaps: 1,
                        d3dFormat: 0,
                        rasterFormat: 0x1500, // RGBA 8888
                        compression: 0,
                        wrapS: 1,
                        wrapT: 1,
                        originalChunk: new Uint8Array(120),
                        previewUrl: event.target.result,
                        newPixels: imgData.data,
                        mipmapList: [{ width: img.width, height: img.height, url: event.target.result, pixels: imgData.data }]
                    };

                    if (duplicateIndex !== -1) {
                        // Timpa data duplikat secara langsung
                        newTex.index = duplicateIndex;
                        textures[duplicateIndex] = newTex;
                        activeTextureIndex = duplicateIndex;
                    } else {
                        // Tambah baru
                        newTex.index = textures.length;
                        textures.push(newTex);
                        activeTextureIndex = textures.length - 1;
                    }
                    
                    addTextureModal.classList.add('hidden');
                    renderTextureList();
                    updateEstimatedSize();
                    showToast(`Berhasil menyimpan tekstur: ${nameVal}`);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });

        // Hapus Tekstur
        deleteTextureBtn.addEventListener('click', () => {
            if (activeTextureIndex === -1) return;
            const tex = textures[activeTextureIndex];

            textures.splice(activeTextureIndex, 1);
            textures.forEach((t, i) => t.index = i);

            showToast(`Menghapus ${tex.name}`);

            if (textures.length > 0) {
                activeTextureIndex = 0;
            } else {
                activeTextureIndex = -1;
            }

            renderTextureList();
            updateEstimatedSize();
        });

        // Ekspor PNG
        exportPngBtn.addEventListener('click', () => {
            if (activeTextureIndex === -1) return;
            const tex = textures[activeTextureIndex];

            const link = document.createElement('a');
            link.download = `${tex.name}.png`;
            link.href = tex.previewUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToast(`Berhasil mengekspor '${tex.name}.png'`);
        });

        // Ekspor Semua PNG
        exportAllBtn.addEventListener('click', () => {
            if (textures.length === 0) return;
            
            textures.forEach((tex, idx) => {
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.download = `${tex.name}.png`;
                    link.href = tex.previewUrl;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }, idx * 250);
            });

            showToast(`Mengekstrak ${textures.length} tekstur...`);
        });

        // Memicu Modal Simpan Konfigurasi Ekspor
        exportSettingsBtn.addEventListener('click', () => {
            exportSettingsModal.classList.remove('hidden');
        });

        closeExportModalBtn.addEventListener('click', () => {
            exportSettingsModal.classList.add('hidden');
        });

        // Penyusun Fail TXD Biner Baru (RenderWare Packer Engine)
        downloadTxdBtn.addEventListener('click', () => {
            if (textures.length === 0) return;

            try {
                const newTxdBuffer = buildNewTXD();
                const blob = new Blob([newTxdBuffer], { type: "application/octet-stream" });
                const url = URL.createObjectURL(blob);
                
                const link = document.createElement('a');
                link.download = currentTxdFile ? `premium_${currentTxdFile.name}` : 'mod_edited.txd';
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                exportSettingsModal.classList.add('hidden');
                showToast("File TXD Baru Berhasil Disimpan!");
            } catch (err) {
                console.error(err);
                showToast("Gagal mengompilasi TXD baru.", "error");
            }
        });

        // Rekonstruksi biner chunk RenderWare standar PC (.txd)
        function buildTextureNativeChunk(tex) {
            let pixelDataList = [];
            let totalPixelsSize = 0;
            let d3dFormat = tex.d3dFormat;
            let depth = tex.depth;
            let rasterFormat = tex.rasterFormat;
            let mipmaps = tex.mipmaps;

            // Membaca pengaturan ekspor Alpha
            const alphaMode = exportAlphaHandling.value;
            const rebuildAllMipmaps = exportRebuildMipmaps.checked;

            let sourcePixels = tex.newPixels;

            // Jika pengguna meminta Rebuild Mipmaps Massal
            if (rebuildAllMipmaps && sourcePixels) {
                const generatedMips = generateDynamicMipmaps(sourcePixels, tex.width, tex.height, mipmaps);
                tex.mipmapList = generatedMips;
            }

            if (sourcePixels) {
                const mipList = tex.mipmapList || [{ width: tex.width, height: tex.height, pixels: sourcePixels }];
                
                mipList.forEach(m => {
                    let mSize = m.width * m.height * 4;
                    let mBytes;

                    if (alphaMode === 'strip') {
                        // Tanpa Alpha: Konversi ke BGR 24-bit
                        mSize = m.width * m.height * 3;
                        mBytes = new Uint8Array(mSize);
                        for (let i = 0; i < m.width * m.height; i++) {
                            mBytes[i * 3] = m.pixels[i * 4 + 2];     // B
                            mBytes[i * 3 + 1] = m.pixels[i * 4 + 1]; // G
                            mBytes[i * 3 + 2] = m.pixels[i * 4];     // R
                        }
                        depth = 24;
                        rasterFormat = 0x1600; // RGB 888
                    } else {
                        // Dengan Alpha (rgba8 standar)
                        mBytes = new Uint8Array(mSize);
                        for (let i = 0; i < m.width * m.height; i++) {
                            mBytes[i * 4] = m.pixels[i * 4 + 2];     // B
                            mBytes[i * 4 + 1] = m.pixels[i * 4 + 1]; // G
                            mBytes[i * 4 + 2] = m.pixels[i * 4];     // R
                            mBytes[i * 4 + 3] = m.pixels[i * 4 + 3]; // A
                        }
                        depth = 32;
                        rasterFormat = 0x1500; // RGBA 8888
                    }

                    pixelDataList.push({ size: mSize, bytes: mBytes });
                    totalPixelsSize += 4 + mSize; 
                });
            } else {
                // Jika tidak diedit, pertahankan data piksel biner asli
                const originalChunk = tex.originalChunk;
                const view = new DataView(originalChunk.buffer, originalChunk.byteOffset, originalChunk.byteLength);
                
                const structContentOffset = 24;
                const hasPalette = (depth <= 8);
                const paletteSize = hasPalette ? (1 << depth) * 4 : 0;
                const paletteOffset = structContentOffset + 88;
                const pixelSizeOffset = paletteOffset + paletteSize;
                
                if (pixelSizeOffset + 4 <= originalChunk.length) {
                    const pixelSize = view.getUint32(pixelSizeOffset, true);
                    const start = pixelSizeOffset + 4;
                    const pixelData = originalChunk.slice(start, start + pixelSize);
                    
                    pixelDataList.push({ size: pixelSize, bytes: pixelData });
                    totalPixelsSize += 4 + pixelSize;
                } else {
                    pixelDataList.push({ size: 0, bytes: new Uint8Array(0) });
                    totalPixelsSize += 4;
                }
            }

            const paletteSize = (depth <= 8) ? (1 << depth) * 4 : 0;
            const structContentSize = 88 + paletteSize + totalPixelsSize;
            
            const structChunkSize = 12 + structContentSize;
            const extChunkSize = 12; 
            const nativeChunkSize = structChunkSize + extChunkSize;

            const buffer = new ArrayBuffer(12 + nativeChunkSize);
            const view = new DataView(buffer);
            const bytes = new Uint8Array(buffer);

            let offset = 0;

            // Texture Native Header (0x15)
            view.setUint32(offset, 0x15, true);
            view.setUint32(offset + 4, nativeChunkSize, true);
            view.setUint32(offset + 8, 0x1803FFFF, true);
            offset += 12;

            // Struct Header (0x01)
            view.setUint32(offset, 0x01, true);
            view.setUint32(offset + 4, structContentSize, true);
            view.setUint32(offset + 8, 0x1803FFFF, true);
            offset += 12;

            // Platform Target (9 untuk PC, 8 untuk Android/Legacy)
            const targetPlatform = parseInt(exportPlatform.value, 10);
            view.setUint32(offset, targetPlatform, true); 
            
            // Filter flags
            let filterFlags = 0x1101; 
            if (tex.wrapS === 3) filterFlags |= 0x10000;
            if (tex.wrapT === 3) filterFlags |= 0x20000;
            view.setUint32(offset + 4, filterFlags, true);
            offset += 8;

            // Name (32 bytes)
            for (let k = 0; k < 32; k++) {
                bytes[offset + k] = k < tex.name.length ? tex.name.charCodeAt(k) : 0;
            }
            offset += 32;

            // Alpha Name (32 bytes)
            for (let k = 0; k < 32; k++) {
                bytes[offset + k] = k < tex.alphaName.length ? tex.alphaName.charCodeAt(k) : 0;
            }
            offset += 32;

            // Format biner
            view.setUint32(offset, rasterFormat, true);
            view.setUint32(offset + 4, d3dFormat, true);
            view.setUint16(offset + 8, tex.width, true);
            view.setUint16(offset + 10, tex.height, true);
            bytes[offset + 12] = depth;
            bytes[offset + 13] = mipmaps;
            bytes[offset + 14] = 4; // Raster Type
            bytes[offset + 15] = tex.compression;
            offset += 16;

            // Salin Palette
            if (paletteSize > 0) {
                if (tex.palette) {
                    bytes.set(tex.palette, offset);
                } else {
                    const origPaletteOffset = 24 + 88;
                    bytes.set(tex.originalChunk.slice(origPaletteOffset, origPaletteOffset + paletteSize), offset);
                }
                offset += paletteSize;
            }

            // Tulis Mipmap size & data ke biner
            pixelDataList.forEach(p => {
                view.setUint32(offset, p.size, true);
                offset += 4;
                bytes.set(p.bytes, offset);
                offset += p.size;
            });

            // Extension Header (0x03)
            view.setUint32(offset, 0x03, true);
            view.setUint32(offset + 4, 0, true);
            view.setUint32(offset + 8, 0x1803FFFF, true);
            offset += 12;

            return bytes;
        }

        function buildNewTXD() {
            let totalNativeSize = 0;
            const nativeBuffers = [];

            textures.forEach(tex => {
                const chunkBytes = buildTextureNativeChunk(tex);
                nativeBuffers.push(chunkBytes);
                totalNativeSize += chunkBytes.byteLength;
            });

            const totalSize = 4 + totalNativeSize; 
            const finalBuffer = new ArrayBuffer(12 + 12 + totalSize);
            const view = new DataView(finalBuffer);
            const bytes = new Uint8Array(finalBuffer);

            let offset = 0;

            // Texture Dictionary Header
            view.setUint32(offset, 0x16, true);
            view.setUint32(offset + 4, totalSize + 12, true);
            view.setUint32(offset + 8, 0x1803FFFF, true);
            offset += 12;

            // Struct Info
            view.setUint32(offset, 0x01, true);
            view.setUint32(offset + 4, 4, true);
            view.setUint32(offset + 8, 0x1803FFFF, true);
            view.setUint16(offset + 12, textures.length, true);
            view.setUint16(offset + 14, 0, true);
            offset += 16;

            nativeBuffers.forEach(chunk => {
                bytes.set(chunk, offset);
                offset += chunk.byteLength;
            });

            return finalBuffer;
        }