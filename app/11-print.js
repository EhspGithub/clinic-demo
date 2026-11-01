function deactivateAllPrintAreas(){["printable-report-area","printable-patient-area","printable-dashboard-area","printable-list-area"].forEach(e=>{const s=document.getElementById(e);s&&s.classList.remove("print-active")})}function openPrintPreview(){deactivateAllPrintAreas(),document.getElementById("printable-report-area").classList.add("print-active");const e=document.getElementById("print-preview-content");e.innerHTML=document.getElementById("printable-report-area").innerHTML,document.getElementById("print-preview-modal").classList.remove("hidden"),lockBackgroundScroll()}function getPatientsMissingNationalId(){return window.patients.filter(e=>e.nationalId===void 0||e.nationalId===null||String(e.nationalId).trim()==="").slice().sort((e,s)=>(e.code||0)-(s.code||0))}function openNoNationalIdModal(){const e=getPatientsMissingNationalId();document.getElementById("no-nid-modal-count").innerText=toPersianDigits(e.length),document.getElementById("no-nid-modal-body").innerHTML=e.length?e.map(s=>`
        <tr class="hover:bg-slate-50 transition">
            <td class="p-2.5 font-bold text-amber-700 font-yekan">${toPersianDigits(s.code)}</td>
            <td class="p-2.5 font-bold text-slate-800">${escapeHTML(s.fullName||s.name+" "+s.lastname)}</td>
            <td class="p-2.5 font-yekan text-slate-600" dir="ltr">${toPersianDigits(s.phone)}</td>
            <td class="p-2.5 font-yekan text-slate-600">${toPersianDigits(s.admissionDate)}</td>
            <td class="p-2.5 font-bold">${escapeHTML(s.status)}</td>
        </tr>
    `).join(""):'<tr><td colspan="5" class="p-6 text-center text-slate-400 italic">\u062F\u0631 \u062D\u0627\u0644 \u062D\u0627\u0636\u0631 \u0647\u06CC\u0686 \u067E\u0631\u0648\u0646\u062F\u0647\u200C\u06CC \u0628\u062F\u0648\u0646 \u06A9\u062F \u0645\u0644\u06CC \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F.</td></tr>',document.getElementById("no-nationalid-modal").classList.remove("hidden"),lockBackgroundScroll()}function closeNoNationalIdModal(){document.getElementById("no-nationalid-modal").classList.add("hidden"),unlockBackgroundScroll()}function generateNoNationalIdPrintHTML(){const e=getPatientsMissingNationalId(),s=e.length?e.map(a=>`
        <tr>
            <td>${toPersianDigits(a.code)}</td>
            <td>${escapeHTML(a.fullName||a.name+" "+a.lastname)}</td>
            <td dir="ltr">${toPersianDigits(a.phone)}</td>
            <td>${toPersianDigits(a.admissionDate)}</td>
            <td>${escapeHTML(a.status)}</td>
        </tr>
    `).join(""):'<tr><td colspan="5" style="text-align:center; padding:20px;">\u0647\u06CC\u0686 \u067E\u0631\u0648\u0646\u062F\u0647\u200C\u06CC \u0628\u062F\u0648\u0646 \u06A9\u062F \u0645\u0644\u06CC \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F.</td></tr>';return`
    <div dir="rtl">
        <div class="flex justify-between items-center border-b-2 border-slate-800 pb-3 mb-4 print-avoid-break">
            <div>
                <h2 class="text-xl font-black">${escapeHTML(window.settings.clinicName||"\u06A9\u0644\u06CC\u0646\u06CC\u06A9 \u062A\u0631\u06A9 \u0627\u0639\u062A\u06CC\u0627\u062F")}</h2>
                <p class="text-xs font-bold text-slate-600 mt-1">\u06AF\u0632\u0627\u0631\u0634 \u067E\u0631\u0648\u0646\u062F\u0647\u200C\u0647\u0627\u06CC \u0641\u0627\u0642\u062F \u06A9\u062F \u0645\u0644\u06CC</p>
            </div>
            <div class="text-left text-xs font-bold space-y-1.5">
                <p>\u062A\u0627\u0631\u06CC\u062E \u0686\u0627\u067E: <span class="font-yekan text-sm">${toPersianDigits(getShamsiToday())}</span></p>
                <p class="bg-amber-50 text-amber-800 px-2 py-1 rounded border border-amber-200">\u062A\u0639\u062F\u0627\u062F \u06A9\u0644: <span class="text-base font-black font-yekan ml-1">${toPersianDigits(e.length)}</span></p>
            </div>
        </div>
        <table class="print-table" style="width:100%; border-collapse:collapse; font-size:11px;">
            <thead>
                <tr>
                    <th>\u06A9\u062F \u067E\u0631\u0648\u0646\u062F\u0647</th>
                    <th>\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC</th>
                    <th>\u0634\u0645\u0627\u0631\u0647 \u062A\u0645\u0627\u0633</th>
                    <th>\u062A\u0627\u0631\u06CC\u062E \u067E\u0630\u06CC\u0631\u0634</th>
                    <th>\u0648\u0636\u0639\u06CC\u062A</th>
                </tr>
            </thead>
            <tbody>${s}</tbody>
        </table>
    </div>
    `}function getEmptyPatientCodes(){const e=window.patients.map(l=>parseInt(l.code,10)).filter(l=>!isNaN(l));if(e.length===0)return[];const s=Math.min(...e),a=Math.max(...e),o=new Set(e),n=[];for(let l=s;l<=a;l++)o.has(l)||n.push(l);return n}function generateEmptyCodesPrintHTML(e){const s=e.map(a=>`
        <tr>
            <td style="height:30px; text-align:center; font-weight:bold;">${toPersianDigits(a)}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    `).join("");return`
    <div dir="rtl">
        <div class="flex justify-between items-center border-b-2 border-slate-800 pb-3 mb-4 print-avoid-break">
            <div>
                <h2 class="text-xl font-black">${escapeHTML(window.settings.clinicName||"\u06A9\u0644\u06CC\u0646\u06CC\u06A9 \u062A\u0631\u06A9 \u0627\u0639\u062A\u06CC\u0627\u062F")}</h2>
                <p class="text-xs font-bold text-slate-600 mt-1">\u0644\u06CC\u0633\u062A \u06A9\u062F \u067E\u0631\u0648\u0646\u062F\u0647\u200C\u0647\u0627\u06CC \u062E\u0627\u0644\u06CC</p>
            </div>
            <div class="text-left text-xs font-bold space-y-1.5">
                <p>\u062A\u0627\u0631\u06CC\u062E \u0686\u0627\u067E: <span class="font-yekan text-sm">${toPersianDigits(getShamsiToday())}</span></p>
                <p class="bg-slate-50 text-slate-800 px-2 py-1 rounded border border-slate-200">\u062A\u0639\u062F\u0627\u062F \u06A9\u0644: <span class="text-base font-black font-yekan ml-1">${toPersianDigits(e.length)}</span></p>
            </div>
        </div>
        <table class="print-table" style="width:100%; border-collapse:collapse; table-layout:fixed; font-size:11px;">
            <colgroup>
                <col style="width:9%;">
                <col style="width:20%;">
                <col style="width:20%;">
                <col style="width:13%;">
                <col style="width:8%;">
                <col style="width:10%;">
                <col style="width:20%;">
            </colgroup>
            <thead>
                <tr>
                    <th>\u06A9\u062F \u067E\u0631\u0648\u0646\u062F\u0647</th>
                    <th>\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC</th>
                    <th>\u06A9\u062F \u0645\u0644\u06CC</th>
                    <th>\u062F\u0627\u0631\u0648\u06CC \u0645\u0635\u0631\u0641\u06CC \u0641\u0639\u0644\u06CC</th>
                    <th>\u062F\u0648\u0632 \u062F\u0627\u0631\u0648</th>
                    <th>\u062A\u0627\u0631\u06CC\u062E \u062A\u0648\u0644\u062F</th>
                    <th>\u0634\u0645\u0627\u0631\u0647 \u062A\u0645\u0627\u0633</th>
                </tr>
            </thead>
            <tbody>${s}</tbody>
        </table>
    </div>
    `}function printEmptyCodesList(){const e=getEmptyPatientCodes();if(e.length===0){showCustomAlert("\u0644\u06CC\u0633\u062A \u062E\u0627\u0644\u06CC \u0627\u0633\u062A","\u062F\u0631 \u062D\u0627\u0644 \u062D\u0627\u0636\u0631 \u0647\u06CC\u0686 \u06A9\u062F \u067E\u0631\u0648\u0646\u062F\u0647\u200C\u06CC \u062E\u0627\u0644\u06CC\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC \u0686\u0627\u067E \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F.");return}deactivateAllPrintAreas();const s=document.getElementById("printable-list-area");s.classList.add("print-active"),s.innerHTML=generateEmptyCodesPrintHTML(e),document.getElementById("print-preview-content").innerHTML=s.innerHTML,document.getElementById("print-preview-modal").classList.remove("hidden"),lockBackgroundScroll()}function printNoNationalIdList(){deactivateAllPrintAreas();const e=document.getElementById("printable-list-area");e.classList.add("print-active"),e.innerHTML=generateNoNationalIdPrintHTML();const s=document.getElementById("print-preview-content");s.innerHTML=e.innerHTML,document.getElementById("print-preview-modal").classList.remove("hidden"),lockBackgroundScroll()}let __printSectionsPatientId=null;function openPrintSectionsModal(e){__printSectionsPatientId=e,document.getElementById("print-sec-base").checked=!0,document.getElementById("print-sec-visits").checked=!1,document.getElementById("print-sec-dispense").checked=!1,document.getElementById("print-sec-calls").checked=!1,document.getElementById("print-sec-history").checked=!1,document.getElementById("print-sec-reviews").checked=!1,document.getElementById("print-sections-modal").classList.remove("hidden"),lockBackgroundScroll()}function closePrintSectionsModal(){document.getElementById("print-sections-modal").classList.add("hidden"),unlockBackgroundScroll(),__printSectionsPatientId=null}function confirmPatientPrintSections(){const e={base:document.getElementById("print-sec-base").checked,visits:document.getElementById("print-sec-visits").checked,dispense:document.getElementById("print-sec-dispense").checked,calls:document.getElementById("print-sec-calls").checked,history:document.getElementById("print-sec-history").checked,reviews:document.getElementById("print-sec-reviews").checked};if(!Object.values(e).some(Boolean)){showCustomAlert("\u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u0627\u0642\u0635","\u0644\u0637\u0641\u0627\u064B \u062D\u062F\u0627\u0642\u0644 \u06CC\u06A9 \u0628\u062E\u0634 \u0631\u0627 \u0628\u0631\u0627\u06CC \u0686\u0627\u067E \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F.");return}const s=__printSectionsPatientId;document.getElementById("print-sections-modal").classList.add("hidden"),__printSectionsPatientId=null,openPatientPrintPreview(s,e)}function openPatientPrintPreview(e,s){const a=window.patients.find(l=>l.id===e);if(!a)return;s=s||{base:!0,visits:!1,dispense:!1,calls:!1,history:!1,reviews:!1},deactivateAllPrintAreas();const o=document.getElementById("printable-patient-area");o.classList.add("print-active"),o.innerHTML=generatePatientPrintHTML(a,s);const n=document.getElementById("print-preview-content");n.innerHTML=o.innerHTML,document.getElementById("print-preview-modal").classList.remove("hidden"),lockBackgroundScroll()}function openDashboardPrintPreview(){deactivateAllPrintAreas();const e=document.getElementById("printable-dashboard-area");e.classList.add("print-active"),e.innerHTML=generateDashboardPrintHTML();const s=document.getElementById("print-preview-content");s.innerHTML=e.innerHTML,document.getElementById("print-preview-modal").classList.remove("hidden"),lockBackgroundScroll()}function generateDashboardPrintHTML(){const e=document.getElementById("tab-dashboard");if(!e)return"";const s=e.cloneNode(!0),a=s.querySelector("#dashboard-stat-cards");a&&(a.classList.remove("xl:grid-cols-6"),a.classList.add("xl:grid-cols-3"));const o=s.querySelector("#dashboard-toolbar");o&&o.remove();const n=e.querySelectorAll("canvas"),l=s.querySelectorAll("canvas");n.forEach((d,t)=>{const r=l[t];if(!r)return;let p="";try{d.width&&d.height&&(p=d.toDataURL("image/png",1))}catch(m){console.error("\u062E\u0637\u0627 \u062F\u0631 \u062A\u0628\u062F\u06CC\u0644 \u0646\u0645\u0648\u062F\u0627\u0631 \u0628\u0647 \u062A\u0635\u0648\u06CC\u0631 \u0628\u0631\u0627\u06CC \u0686\u0627\u067E:",m)}if(!p)return;const i=document.createElement("img");i.src=p,i.style.maxWidth="100%",i.style.maxHeight="230px",i.style.margin="0 auto",i.style.display="block",r.replaceWith(i)}),Array.from(s.children).forEach(d=>d.classList.add("print-avoid-break"));const c=toPersianDigits(getShamsiToday()),b=window.settings&&window.settings.clinicName||"\u06A9\u0644\u06CC\u0646\u06CC\u06A9 \u062A\u062E\u0635\u0635\u06CC \u062A\u0631\u06A9 \u0627\u0639\u062A\u06CC\u0627\u062F \u0648 \u062F\u0631\u0645\u0627\u0646";return`
        <div class="flex justify-between items-center border-b-2 border-slate-800 pb-4 mb-6 print-avoid-break">
            <div>
                <h1 class="text-xl font-black text-slate-950">${escapeHTML(b)}</h1>
                <p class="text-xs text-slate-700 mt-1">\u06AF\u0632\u0627\u0631\u0634 \u0622\u0645\u0627\u0631\u06CC \u0648 \u062A\u062D\u0644\u06CC\u0644\u06CC \u062F\u0627\u0634\u0628\u0648\u0631\u062F \u0645\u062F\u06CC\u0631\u06CC\u062A\u06CC</p>
            </div>
            <div class="text-left text-xs text-slate-800 leading-relaxed">
                <div><strong>\u062A\u0627\u0631\u06CC\u062E \u0686\u0627\u067E:</strong> ${c}</div>
                <div><strong>\u0646\u0648\u0639 \u0633\u0646\u062F:</strong> \u0622\u0645\u0627\u0631 \u0648 \u0627\u0631\u0642\u0627\u0645 \u06A9\u0644\u06CC \u0633\u0627\u0645\u0627\u0646\u0647</div>
                <div><strong>\u062F\u0633\u062A\u0631\u0633\u06CC:</strong> \u0645\u062D\u0631\u0645\u0627\u0646\u0647 / \u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u0644\u06CC\u0646\u06CC\u06A9</div>
            </div>
        </div>
        <div class="space-y-4">${s.innerHTML}</div>
        <div class="mt-10 flex justify-between items-center text-xs text-slate-800 print-avoid-break">
            <div>
                <p class="font-bold">\u0645\u0647\u0631 \u0648 \u0627\u0645\u0636\u0627\u06CC \u0645\u0633\u0626\u0648\u0644 \u0641\u0646\u06CC / \u0645\u062F\u06CC\u0631 \u06A9\u0644\u06CC\u0646\u06CC\u06A9:</p>
                <div class="h-16 w-32 border border-dashed border-slate-800 mt-2 rounded-lg flex items-center justify-center text-slate-400">\u0645\u062D\u0644 \u0645\u0647\u0631 \u06A9\u0644\u06CC\u0646\u06CC\u06A9</div>
            </div>
            <div class="text-left">
                <p>\u0633\u0627\u0645\u0627\u0646\u0647 \u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u0644\u06CC\u0646\u06CC\u06A9 - \u0646\u0633\u062E\u0647 \u0622\u0641\u0644\u0627\u06CC\u0646 \u0648 \u0647\u0648\u0634\u0645\u0646\u062F</p>
                <p class="text-[9px] text-slate-600 mt-1">\u062A\u0648\u0644\u06CC\u062F \u0634\u062F\u0647 \u0628\u0647 \u0635\u0648\u0631\u062A \u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u0632 \u067E\u0627\u06CC\u06AF\u0627\u0647 \u062F\u0627\u062F\u0647 \u0644\u067E\u200C\u062A\u0627\u067E \u062F\u0631 \u062A\u0627\u0631\u06CC\u062E ${c}</p>
            </div>
        </div>
    `}function generatePatientPrintHTML(e,s){s=s||{base:!0,visits:!1,dispense:!1,calls:!1,history:!1,reviews:!1};let a="";if(s.visits){const d=window.visits.filter(t=>t.patientId===e.id).sort((t,r)=>r.date.localeCompare(t.date)||r.id.localeCompare(t.id));a=`
        <div class="mb-4 print-avoid-break">
            <h3 class="bg-slate-100 px-3 py-1 rounded-lg border border-slate-300 text-sm font-bold mb-2">\u0633\u0648\u0627\u0628\u0642 \u0648\u06CC\u0632\u06CC\u062A \u0648 \u062F\u0631\u0645\u0627\u0646 (\u062A\u0627\u0631\u06CC\u062E\u0686\u0647 \u06A9\u0627\u0645\u0644)</h3>
            ${d.length?`
            <table class="w-full text-right border-collapse border border-slate-300 text-xs font-semibold">
                <thead>
                    <tr class="bg-slate-100 border-b border-slate-300">
                        <th class="p-1.5 border-l border-slate-300">\u062A\u0627\u0631\u06CC\u062E</th>
                        <th class="p-1.5 border-l border-slate-300">\u062F\u0631\u0645\u0627\u0646/\u062F\u0648\u0632</th>
                        <th class="p-1.5 border-l border-slate-300">\u0648\u0636\u0639\u06CC\u062A</th>
                        <th class="p-1.5">\u06CC\u0627\u062F\u062F\u0627\u0634\u062A \u067E\u0632\u0634\u06A9</th>
                    </tr>
                </thead>
                <tbody>
                    ${d.map(t=>`
                        <tr class="border-b border-slate-300 print-avoid-break">
                            <td class="p-1.5 border-l border-slate-300 font-yekan">${toPersianDigits(t.date)}</td>
                            <td class="p-1.5 border-l border-slate-300 text-indigo-700">${escapeHTML(t.newDrug)} (${formatDosageHTML(t.newDrug,t.newDosage)})</td>
                            <td class="p-1.5 border-l border-slate-300">${escapeHTML(t.status)}</td>
                            <td class="p-1.5 text-[10px]">${escapeHTML(t.notes)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>`:'<p class="text-xs text-slate-400 italic">\u062A\u0627\u06A9\u0646\u0648\u0646 \u0647\u06CC\u0686 \u0648\u06CC\u0632\u06CC\u062A\u06CC \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0645\u0631\u0627\u062C\u0639 \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.</p>'}
        </div>`}let o="";if(s.dispense){const d=e.dispenseHistory||[];o=`
        <div class="mb-4 print-avoid-break">
            <h3 class="bg-slate-100 px-3 py-1 rounded-lg border border-slate-300 text-sm font-bold mb-2">\u062A\u0627\u0631\u06CC\u062E\u0686\u0647 \u062F\u0627\u0631\u0648 (\u0633\u0648\u0627\u0628\u0642 \u062A\u062D\u0648\u06CC\u0644 \u062F\u0627\u0631\u0648)</h3>
            ${d.length?`
            <table class="w-full text-right border-collapse border border-slate-300 text-xs font-semibold">
                <thead>
                    <tr class="bg-slate-100 border-b border-slate-300">
                        <th class="p-1.5 border-l border-slate-300">\u062A\u0627\u0631\u06CC\u062E \u062A\u062D\u0648\u06CC\u0644</th>
                        <th class="p-1.5 border-l border-slate-300">\u062F\u0627\u0631\u0648</th>
                        <th class="p-1.5 border-l border-slate-300">\u0645\u0642\u062F\u0627\u0631</th>
                        <th class="p-1.5 border-l border-slate-300">\u0645\u0631\u0627\u062C\u0639\u0647 \u0628\u0639\u062F\u06CC</th>
                        <th class="p-1.5 border-l border-slate-300">\u062A\u062D\u0648\u06CC\u0644\u200C\u06AF\u06CC\u0631\u0646\u062F\u0647</th>
                        <th class="p-1.5">\u062B\u0628\u062A\u200C\u06A9\u0646\u0646\u062F\u0647</th>
                    </tr>
                </thead>
                <tbody>
                    ${d.map(t=>{const r=t.drug.includes("\u0642\u0631\u0635")||t.drug.includes("\u0642 ")||t.drug.includes("\u0628\u0648\u067E\u0631\u0646\u0648\u0631\u0641\u06CC\u0646")?"\u0645\u06CC\u0644\u06CC\u200C\u06AF\u0631\u0645":"\u0633\u06CC\u200C\u0633\u06CC";return`
                        <tr class="border-b border-slate-300 print-avoid-break">
                            <td class="p-1.5 border-l border-slate-300 font-yekan">${toPersianDigits(t.date)}</td>
                            <td class="p-1.5 border-l border-slate-300 text-indigo-700">${escapeHTML(t.drug)}</td>
                            <td class="p-1.5 border-l border-slate-300 font-yekan">${toPersianDigits(t.quantity)} ${r}</td>
                            <td class="p-1.5 border-l border-slate-300 font-yekan">${toPersianDigits(t.nextVisit)}</td>
                            <td class="p-1.5 border-l border-slate-300">${escapeHTML(t.recipient==="\u062E\u0648\u062F\u0634"?"\u062E\u0648\u062F \u0628\u06CC\u0645\u0627\u0631":"\u0647\u0645\u0631\u0627\u0647 ("+(t.companion||"")+")")}</td>
                            <td class="p-1.5 text-[10px]">${escapeHTML(t.recordedBy||"\u0633\u06CC\u0633\u062A\u0645")}</td>
                        </tr>`}).join("")}
                </tbody>
            </table>`:'<p class="text-xs text-slate-400 italic">\u062A\u0627\u06A9\u0646\u0648\u0646 \u0647\u06CC\u0686 \u0633\u0627\u0628\u0642\u0647 \u0627\u0631\u0627\u0626\u0647 \u062F\u0627\u0631\u0648\u06CC\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.</p>'}
        </div>`}let n="";if(s.calls){const d=window.contactLogs.filter(t=>t.patientId===e.id).sort((t,r)=>r.id.localeCompare(t.id));n=`
        <div class="mb-4 print-avoid-break">
            <h3 class="bg-slate-100 px-3 py-1 rounded-lg border border-slate-300 text-sm font-bold mb-2">\u062A\u0627\u0631\u06CC\u062E\u0686\u0647 \u062A\u0645\u0627\u0633\u200C\u0647\u0627</h3>
            ${d.length?`
            <table class="w-full text-right border-collapse border border-slate-300 text-xs font-semibold">
                <thead>
                    <tr class="bg-slate-100 border-b border-slate-300">
                        <th class="p-1.5 border-l border-slate-300">\u062A\u0627\u0631\u06CC\u062E</th>
                        <th class="p-1.5 border-l border-slate-300">\u0646\u062A\u06CC\u062C\u0647 \u062A\u0645\u0627\u0633</th>
                        <th class="p-1.5 border-l border-slate-300">\u0634\u0631\u062D \u0645\u06A9\u0627\u0644\u0645\u0647</th>
                        <th class="p-1.5 border-l border-slate-300">\u0627\u0642\u062F\u0627\u0645 \u0628\u0639\u062F\u06CC</th>
                        <th class="p-1.5">\u062B\u0628\u062A\u200C\u06A9\u0646\u0646\u062F\u0647</th>
                    </tr>
                </thead>
                <tbody>
                    ${d.map(t=>`
                        <tr class="border-b border-slate-300 print-avoid-break">
                            <td class="p-1.5 border-l border-slate-300 font-yekan">${toPersianDigits(t.date)}</td>
                            <td class="p-1.5 border-l border-slate-300">${escapeHTML(t.result)}</td>
                            <td class="p-1.5 border-l border-slate-300 text-[10px]">${escapeHTML(t.notes)}</td>
                            <td class="p-1.5 border-l border-slate-300 text-[10px]">${t.nextAction?escapeHTML(t.nextAction):"-"}</td>
                            <td class="p-1.5 text-[10px]">${escapeHTML(t.recordedBy)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>`:'<p class="text-xs text-slate-400 italic">\u062A\u0627\u06A9\u0646\u0648\u0646 \u0647\u06CC\u0686 \u062A\u0645\u0627\u0633\u06CC \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0645\u0631\u0627\u062C\u0639 \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.</p>'}
        </div>`}let l="";if(s.history){const d=window.auditLogs.filter(t=>t.patientId===e.id).sort((t,r)=>(r.timestamp||0)-(t.timestamp||0));l=`
        <div class="mb-4 print-avoid-break">
            <h3 class="bg-slate-100 px-3 py-1 rounded-lg border border-slate-300 text-sm font-bold mb-2">\u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u067E\u0631\u0648\u0646\u062F\u0647 (Audit Trail)</h3>
            ${d.length?`
            <table class="w-full text-right border-collapse border border-slate-300 text-xs font-semibold">
                <thead>
                    <tr class="bg-slate-100 border-b border-slate-300">
                        <th class="p-1.5 border-l border-slate-300">\u0641\u06CC\u0644\u062F \u062A\u063A\u06CC\u06CC\u0631 \u062F\u0627\u062F\u0647 \u0634\u062F\u0647</th>
                        <th class="p-1.5 border-l border-slate-300">\u062A\u063A\u06CC\u06CC\u0631</th>
                        <th class="p-1.5">\u062A\u0627\u0631\u06CC\u062E \u0648 \u0633\u0627\u0639\u062A</th>
                    </tr>
                </thead>
                <tbody>
                    ${d.map(t=>`
                        <tr class="border-b border-slate-300 print-avoid-break">
                            <td class="p-1.5 border-l border-slate-300">${escapeHTML(t.fieldName)}</td>
                            <td class="p-1.5 border-l border-slate-300 text-[10px]">${escapeHTML(t.oldValue)} \u2190 ${escapeHTML(t.newValue)}</td>
                            <td class="p-1.5 font-yekan text-[10px]">${toPersianDigits(t.date)} - ${toPersianDigits(t.time)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>`:'<p class="text-xs text-slate-400 italic">\u062A\u0627\u06A9\u0646\u0648\u0646 \u062A\u063A\u06CC\u06CC\u0631\u06CC \u062F\u0631 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u067E\u0627\u06CC\u0647 \u0627\u06CC\u0646 \u067E\u0631\u0648\u0646\u062F\u0647 \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.</p>'}
        </div>`}let c="";if(s.reviews){const d=window.patientReviews.filter(t=>t.patientId===e.id).sort((t,r)=>r.id.localeCompare(t.id));c=`
        <div class="mb-4 print-avoid-break">
            <h3 class="bg-slate-100 px-3 py-1 rounded-lg border border-slate-300 text-sm font-bold mb-2">\u0628\u0631\u0631\u0633\u06CC \u067E\u0631\u0648\u0646\u062F\u0647 (\u06A9\u0646\u062A\u0631\u0644 \u06A9\u06CC\u0641\u06CC\u062A)</h3>
            ${d.length?`
            <table class="w-full text-right border-collapse border border-slate-300 text-xs font-semibold">
                <thead>
                    <tr class="bg-slate-100 border-b border-slate-300">
                        <th class="p-1.5 border-l border-slate-300">\u062A\u0627\u0631\u06CC\u062E</th>
                        <th class="p-1.5 border-l border-slate-300">\u0628\u0631\u0631\u0633\u06CC\u200C\u06A9\u0646\u0646\u062F\u0647</th>
                        <th class="p-1.5 border-l border-slate-300">\u0646\u062A\u06CC\u062C\u0647</th>
                        <th class="p-1.5 border-l border-slate-300">\u0645\u0648\u0627\u0631\u062F \u0646\u0642\u0635</th>
                        <th class="p-1.5">\u062A\u0648\u0636\u06CC\u062D\u0627\u062A</th>
                    </tr>
                </thead>
                <tbody>
                    ${d.map(t=>`
                        <tr class="border-b border-slate-300 print-avoid-break">
                            <td class="p-1.5 border-l border-slate-300 font-yekan">${toPersianDigits(t.date)}</td>
                            <td class="p-1.5 border-l border-slate-300">${escapeHTML(t.reviewer)}</td>
                            <td class="p-1.5 border-l border-slate-300">${t.isComplete?"\u06A9\u0627\u0645\u0644":"\u0646\u0627\u0642\u0635"}</td>
                            <td class="p-1.5 border-l border-slate-300 text-[10px]">${t.deficiencies&&t.deficiencies.length?escapeHTML(t.deficiencies.join("\u060C ")):"-"}</td>
                            <td class="p-1.5 text-[10px]">${t.notes?escapeHTML(t.notes):"-"}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>`:'<p class="text-xs text-slate-400 italic">\u062A\u0627\u06A9\u0646\u0648\u0646 \u0647\u06CC\u0686 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646\u062A\u0631\u0644 \u06A9\u06CC\u0641\u06CC\u062A\u06CC \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u067E\u0631\u0648\u0646\u062F\u0647 \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.</p>'}
        </div>`}let b="";return s.base&&(b=`
        <!-- Demographics: \u06F8 \u0641\u06CC\u0644\u062F \u062F\u0631 \u062F\u0648 \u0631\u062F\u06CC\u0641 \u06F4\u062A\u0627\u06CC\u06CC -->
        <div class="mb-4 print-avoid-break">
            <h3 class="bg-slate-100 px-3 py-1 rounded-lg border border-slate-300 text-sm font-bold mb-2">\u0645\u0634\u062E\u0635\u0627\u062A \u0647\u0648\u06CC\u062A\u06CC \u0648 \u067E\u0630\u06CC\u0631\u0634</h3>
            <div class="grid grid-cols-4 gap-2 text-xs font-semibold">
                <div class="border border-slate-300 p-1.5 rounded-lg bg-slate-50/50"><span class="block text-[9px] text-slate-500 mb-0.5">\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC</span><span class="text-sm font-bold">${escapeHTML(e.fullName)}</span></div>
                <div class="border border-slate-300 p-1.5 rounded-lg bg-slate-50/50"><span class="block text-[9px] text-slate-500 mb-0.5">\u06A9\u062F \u0645\u0644\u06CC</span><span class="font-yekan font-bold text-xs tracking-widest">${toPersianDigits(e.nationalId)}</span></div>
                <div class="border border-slate-300 p-1.5 rounded-lg bg-slate-50/50"><span class="block text-[9px] text-slate-500 mb-0.5">\u0633\u0646</span><span class="font-yekan font-bold">${toPersianDigits(e.age)}</span> \u0633\u0627\u0644</div>
                <div class="border border-slate-300 p-1.5 rounded-lg bg-slate-50/50"><span class="block text-[9px] text-slate-500 mb-0.5">\u062A\u0627\u0631\u06CC\u062E \u062A\u0648\u0644\u062F</span><span class="font-yekan font-bold">${toPersianDigits(e.birthdate)}</span></div>
                <div class="border border-slate-300 p-1.5 rounded-lg bg-slate-50/50"><span class="block text-[9px] text-slate-500 mb-0.5">\u062A\u0644\u0641\u0646 \u062A\u0645\u0627\u0633</span><span class="font-yekan font-bold tracking-widest" dir="ltr">${toPersianDigits(e.phone)}</span></div>
                <div class="border border-slate-300 p-1.5 rounded-lg bg-slate-50/50"><span class="block text-[9px] text-slate-500 mb-0.5">\u0648\u0636\u0639\u06CC\u062A \u062A\u0627\u0647\u0644</span>${escapeHTML(e.marital)}</div>
                <div class="border border-slate-300 p-1.5 rounded-lg bg-slate-50/50"><span class="block text-[9px] text-slate-500 mb-0.5">\u0634\u063A\u0644</span>${escapeHTML(e.employment)} ${e.job?`(${escapeHTML(e.job)})`:""}</div>
                <div class="border border-slate-300 p-1.5 rounded-lg bg-slate-50/50"><span class="block text-[9px] text-slate-500 mb-0.5">\u062A\u0627\u0631\u06CC\u062E \u067E\u0630\u06CC\u0631\u0634 \u062F\u0631 \u0645\u0631\u06A9\u0632</span><span class="font-yekan font-bold">${toPersianDigits(e.admissionDate)}</span></div>
            </div>
        </div>

        <!-- Medical & Substance: \u0627\u0641\u0632\u0648\u062F\u0647 \u0634\u062F\u0646 \u0641\u06CC\u0644\u062F \xAB\u062A\u0648\u0636\u06CC\u062D\u0627\u062A\xBB \u0627\u0632 \u06CC\u0627\u062F\u062F\u0627\u0634\u062A \u0628\u0627\u0644\u06CC\u0646\u06CC/\u0631\u0648\u0627\u0646\u067E\u0632\u0634\u06A9\u06CC \u0641\u0631\u0645 \u067E\u0630\u06CC\u0631\u0634 -->
        <div class="mb-4 print-avoid-break">
            <h3 class="bg-slate-100 px-3 py-1 rounded-lg border border-slate-300 text-sm font-bold mb-2">\u0633\u0648\u0627\u0628\u0642 \u0645\u0635\u0631\u0641 \u0648 \u067E\u0632\u0634\u06A9\u06CC</h3>
            <div class="grid grid-cols-5 gap-2 text-xs font-semibold mb-2">
                <div class="border border-slate-300 p-1.5 rounded-lg bg-amber-50/50 col-span-2"><span class="block text-[9px] text-slate-500 mb-0.5">\u0645\u0627\u062F\u0647 \u0645\u0635\u0631\u0641\u06CC \u0627\u0635\u0644\u06CC</span><span class="text-amber-800 font-bold">${escapeHTML(e.substance)} ${e.substanceOther?`(${escapeHTML(e.substanceOther)})`:""}</span></div>
                <div class="border border-slate-300 p-1.5 rounded-lg bg-slate-50/50 col-span-1"><span class="block text-[9px] text-slate-500 mb-0.5">\u0645\u062F\u062A \u0645\u0635\u0631\u0641</span><span class="font-yekan font-bold">${toPersianDigits(e.duration)}</span> \u0633\u0627\u0644</div>
                <div class="border border-slate-300 p-1.5 rounded-lg bg-red-50/30 col-span-2">
                    <span class="block text-[9px] text-red-800 font-bold mb-0.5">\u0628\u06CC\u0645\u0627\u0631\u06CC\u200C\u0647\u0627\u06CC \u0632\u0645\u06CC\u0646\u0647\u200C\u0627\u06CC</span>
                    ${e.medHistory&&e.medHistory.length?escapeHTML(e.medHistory.join(" - ")):"\u0641\u0627\u0642\u062F \u0633\u0627\u0628\u0642\u0647 \u0628\u06CC\u0645\u0627\u0631\u06CC"}
                </div>
            </div>
            <div class="border border-slate-300 p-1.5 rounded-lg bg-slate-50/50 text-xs font-semibold">
                <span class="block text-[9px] text-slate-500 mb-0.5">\u062A\u0648\u0636\u06CC\u062D\u0627\u062A (\u06CC\u0627\u062F\u062F\u0627\u0634\u062A\u200C\u0647\u0627\u06CC \u0628\u0627\u0644\u06CC\u0646\u06CC \u0648 \u0631\u0648\u0627\u0646\u200C\u067E\u0632\u0634\u06A9\u06CC)</span>
                <span class="font-normal leading-relaxed whitespace-pre-wrap">${e.medicalNotes?escapeHTML(e.medicalNotes):"\u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A."}</span>
            </div>
        </div>

        <!-- Treatment -->
        <div class="mb-4 print-avoid-break">
            <h3 class="bg-slate-100 px-3 py-1 rounded-lg border border-slate-300 text-sm font-bold mb-2">\u0648\u0636\u0639\u06CC\u062A \u062F\u0631\u0645\u0627\u0646\u06CC \u0641\u0639\u0644\u06CC</h3>
            <div class="grid grid-cols-3 gap-2 text-xs font-semibold">
                <div class="border border-slate-300 p-1.5 rounded-lg bg-slate-50/50"><span class="block text-[9px] text-slate-500 mb-0.5">\u062F\u0631\u0645\u0627\u0646 \u0628\u062F\u0648 \u0648\u0631\u0648\u062F</span>${escapeHTML(e.initialDrug)} <span class="font-yekan font-bold">(${formatDosageHTML(e.initialDrug,e.initialDosage)})</span></div>
                <div class="border border-emerald-300 p-1.5 rounded-lg bg-emerald-50"><span class="block text-[9px] text-emerald-800 mb-0.5">\u062F\u0631\u0645\u0627\u0646 \u0641\u0639\u0644\u06CC</span><span class="text-emerald-900 font-bold">${escapeHTML(e.currentDrug)}</span> <span class="font-black font-yekan text-emerald-900 text-sm">(${formatDosageHTML(e.currentDrug,e.currentDosage)})</span></div>
                <div class="border border-slate-300 p-1.5 rounded-lg bg-slate-50/50"><span class="block text-[9px] text-slate-500 mb-0.5">\u0648\u0636\u0639\u06CC\u062A \u067E\u0631\u0648\u0646\u062F\u0647 \u0648 \u062D\u0636\u0648\u0631</span>${escapeHTML(e.status)} / ${escapeHTML(e.attendance)}</div>
            </div>
            ${e.status==="\u063A\u06CC\u0631\u0641\u0639\u0627\u0644"?`
            <div class="border border-rose-300 p-1.5 rounded-lg bg-rose-50 text-xs font-bold text-rose-800 mt-2">
                <span class="block text-[9px] mb-0.5 opacity-80">\u0639\u0644\u062A \u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u067E\u0631\u0648\u0646\u062F\u0647</span>
                ${escapeHTML(e.deactiveReason)} ${e.deactiveNotes?` - <span class="font-normal">${escapeHTML(e.deactiveNotes)}</span>`:""}
            </div>`:""}
        </div>`),`
    <div class="border-2 border-slate-800 p-6 rounded-2xl bg-white text-slate-900 font-sans mx-auto w-full max-w-4xl" dir="rtl">
        <div class="flex justify-between items-center border-b-2 border-slate-800 pb-3 mb-4 print-avoid-break">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center border border-slate-300">
                    <i class="fa-solid fa-file-medical text-2xl text-slate-700"></i>
                </div>
                <div>
                    <h2 class="text-xl font-black">${escapeHTML(window.settings.clinicName||"\u06A9\u0644\u06CC\u0646\u06CC\u06A9 \u062A\u0631\u06A9 \u0627\u0639\u062A\u06CC\u0627\u062F")}</h2>
                    <p class="text-xs font-bold text-slate-600 mt-1">\u062E\u0644\u0627\u0635\u0647 \u067E\u0631\u0648\u0646\u062F\u0647 \u0628\u0627\u0644\u06CC\u0646\u06CC \u0645\u0631\u0627\u062C\u0639</p>
                </div>
            </div>
            <div class="text-left text-xs font-bold space-y-1.5">
                <p>\u062A\u0627\u0631\u06CC\u062E \u0686\u0627\u067E: <span class="font-yekan text-sm">${toPersianDigits(getShamsiToday())}</span></p>
                <p class="bg-teal-50 text-teal-800 px-2 py-1 rounded border border-teal-200">\u0634\u0645\u0627\u0631\u0647 \u067E\u0631\u0648\u0646\u062F\u0647: <span class="text-base font-black font-yekan ml-1">${toPersianDigits(e.code)}</span></p>
            </div>
        </div>

        ${b}
        ${a}
        ${o}
        ${n}
        ${l}
        ${c}

        <!-- Footer Signatures -->
        <div class="mt-8 flex justify-between items-end border-t-2 border-slate-800 pt-4 print-avoid-break">
            <div class="text-xs font-bold text-slate-800 text-center">
                <p>\u0627\u0645\u0636\u0627 \u0648 \u0645\u0647\u0631 \u067E\u0632\u0634\u06A9 \u0645\u0639\u0627\u0644\u062C</p>
                <p class="mt-10 border-t border-slate-400 w-40 mx-auto pt-1">${escapeHTML(window.staff?.doctors?.[0]||"\u062F\u06A9\u062A\u0631 \u0645\u0639\u0627\u0644\u062C")}</p>
            </div>
            <div class="text-[10px] text-slate-400 font-semibold text-left">
                <p>\u0633\u06CC\u0633\u062A\u0645 \u0645\u062F\u06CC\u0631\u06CC\u062A \u0647\u0648\u0634\u0645\u0646\u062F \u062F\u0631\u0645\u0627\u0646 \u0627\u0639\u062A\u06CC\u0627\u062F</p>
                <p class="font-yekan">Printed at: ${toPersianDigits(new Date().toLocaleTimeString("fa-IR"))}</p>
            </div>
        </div>
    </div>
    `}function closePrintPreview(){document.getElementById("print-preview-modal").classList.add("hidden"),unlockBackgroundScroll(),deactivateAllPrintAreas();const e=document.getElementById("print-preview-content");e&&(e.innerHTML="")}function standalonePrintReport(){window.focus(),window.print()}
