function filterDispenseTab(l=!0){const e=document.getElementById("search-d-query").value.toLowerCase(),s=document.getElementById("search-d-drug").value,n=document.getElementById("search-d-status").value,t=document.getElementById("search-d-insurance").value,i=window.patients.filter(a=>{const o=(a.fullName||a.name+" "+a.lastname).toLowerCase().includes(e)||a.code.toString().includes(e)||a.phone.includes(e)||(a.nationalId||"").includes(e);let r=s===""||a.currentDrug===s;s==="\u062F\u0627\u0631\u0648\u06CC \u0646\u0627\u0645\u0639\u0644\u0648\u0645"&&(r=!a.currentDrug||!["\u0631\u0648\u0627\u0646 \u062F\u0631\u0645\u0627\u0646\u06CC","\u0634 \u0645\u062A\u0627\u062F\u0648\u0646","\u0642 \u0645\u062A\u0627\u062F\u0648\u0646","\u0628\u0648\u067E\u0631\u0646\u0648\u0631\u0641\u06CC\u0646","\u0627\u067E\u06CC\u0648\u0645"].includes(a.currentDrug));const c=n===""||a.status===n,u=t===""||a.insurance===t;return o&&r&&c&&u});i.sort((a,d)=>Number(a.code)-Number(d.code)),tableState.dispense.data=i,l&&(tableState.dispense.page=1),renderPaginatedDispense()}function renderDispenseList(){filterDispenseTab(!1)}function renderPaginatedDispense(){const l=document.getElementById("dispense-table-body");if(!l)return;l.innerHTML="";const e=tableState.dispense.data.length,s=tableState.dispense.limit;let n=s==="all"?0:(tableState.dispense.page-1)*s,t=s==="all"?e:n+s;const i=tableState.dispense.data.slice(n,t),a=document.createDocumentFragment(),d=buildLatestVisitMap(window.visits);i.forEach(o=>{const r=document.createElement("tr");r.className="hover:bg-slate-50 transition border-b border-gray-100 text-xs";const c=d.get(o.id),u=c?c.date:o.admissionDate,f=o.lastDispenseDate||"\u062B\u0628\u062A \u0646\u0634\u062F\u0647",m=o.status==="\u0641\u0639\u0627\u0644"||o.status==="\u0641\u0639\u0627\u0644 \u0645\u06CC\u200C\u0628\u0627\u0634\u062F (\u062F\u0631 \u062D\u0627\u0644 \u0645\u0631\u0627\u062C\u0639\u0647 / \u062F\u0631 \u0631\u0627\u0647)"?"bg-emerald-100 text-emerald-800":"bg-rose-100 text-rose-800";let b="bg-rose-100 text-rose-800";o.attendance==="\u0645\u0646\u0638\u0645"?b="bg-emerald-100 text-emerald-800":o.attendance==="\u0646\u0627\u0645\u0646\u0638\u0645"&&(b="bg-amber-100 text-amber-800");const x=o.insurance==="\u062F\u0627\u0631\u062F"?"bg-blue-100 text-blue-800":"bg-slate-100 text-slate-600";r.innerHTML=`
            <td class="p-4 font-bold text-teal-brand font-yekan">${toPersianDigits(o.code)}</td>
            <td class="p-4 font-bold text-slate-800">${escapeHTML(o.fullName||o.name+" "+o.lastname)}</td>
            <td class="p-4 text-slate-700 font-bold">${escapeHTML(o.currentDrug)} <span class="text-indigo-600 font-yekan mr-1">(${formatDosageHTML(o.currentDrug,o.currentDosage)})</span></td>
            <td class="p-4 text-center"><span class="px-2.5 py-1 rounded text-[10px] font-bold ${m}">${escapeHTML(o.status)}</span></td>
            <td class="p-4 text-center"><span class="px-2.5 py-1 rounded text-[10px] font-bold ${b}">${escapeHTML(o.attendance)}</span></td>
            <td class="p-4 text-center"><span class="px-2.5 py-1 rounded text-[10px] font-bold ${x}">${escapeHTML(o.insurance)}</span></td>
            <td class="p-4 text-slate-500 font-yekan font-bold">${toPersianDigits(u)}</td>
            <td class="p-4 text-teal-700 font-yekan font-bold bg-teal-50/30 border-r border-gray-100">${toPersianDigits(f)}</td>
            <td class="p-4 text-center">
                <button onclick="openDispenseModal('${o.id}')" class="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold transition shadow-sm flex items-center gap-1 mx-auto border border-teal-500/30">
                    <i class="fa-solid fa-pills text-[10px]"></i> \u062B\u0628\u062A \u0627\u0631\u0627\u0626\u0647 \u062F\u0627\u0631\u0648
                </button>
            </td>
        `,a.appendChild(r)}),l.appendChild(a),renderPaginationControls("dispense")}window.handleDispenseDrugChange=function(){const l=document.getElementById("dispense-drug-display").value,e=document.getElementById("dispense-quantity-unit");l&&(l.includes("\u0642\u0631\u0635")||l.includes("\u0642 ")||l==="\u0642 \u0645\u062A\u0627\u062F\u0648\u0646"||l.includes("\u0628\u0648\u067E\u0631\u0646\u0648\u0631\u0641\u06CC\u0646"))?e.innerText="\u0645\u06CC\u0644\u06CC\u200C\u06AF\u0631\u0645":e.innerText="\u0633\u06CC\u200C\u0633\u06CC"},window.openDispenseModal=function(l){const e=window.patients.find(t=>t.id===l);if(!e)return;document.getElementById("dispense-patient-id").value=l,document.getElementById("d-m-code").innerText=toPersianDigits(e.code),document.getElementById("d-m-name").innerText=e.fullName||e.name+" "+e.lastname,document.getElementById("d-m-drug").innerText=e.currentDrug||"\u0628\u062F\u0648\u0646 \u062F\u0627\u0631\u0648",document.getElementById("d-m-daily-dosage").innerText=e.currentDosage?`${toPersianDigits(e.currentDosage)} ${getDoseUnitCode(e.currentDrug)} \u0631\u0648\u0632\u0627\u0646\u0647`.replace(/\s+/g," ").trim():"\u06F0 / \u0631\u0648\u0627\u0646 \u062F\u0631\u0645\u0627\u0646\u06CC",document.getElementById("dispense-date").value=getShamsiToday();const s=document.getElementById("dispense-drug-display");s.value=e.currentDrug||"\u0631\u0648\u0627\u0646 \u062F\u0631\u0645\u0627\u0646\u06CC",s.value||(s.value="\u0631\u0648\u0627\u0646 \u062F\u0631\u0645\u0627\u0646\u06CC"),document.getElementById("dispense-quantity").value="",document.getElementById("dispense-next-visit").value="",document.getElementById("dispense-days-calculated").innerText="\u06F0 \u0631\u0648\u0632 \u062F\u06CC\u06AF\u0631",handleDispenseDrugChange(),document.getElementById("dispense-recipient").value="\u062E\u0648\u062F\u0634",document.getElementById("dispense-companion-name").value="",document.getElementById("dispense-companion-name").removeAttribute("required"),document.getElementById("dispense-companion-container").classList.add("hidden"),document.getElementById("dispense-modal").classList.remove("hidden"),lockBackgroundScroll();const n=document.getElementById("dispense-date");n&&(n.addEventListener("jdp:change",calculateNextDispenseVisit),n.addEventListener("change",calculateNextDispenseVisit),n.addEventListener("input",calculateNextDispenseVisit)),calculateNextDispenseVisit()},window.closeDispenseModal=function(){document.getElementById("dispense-modal").classList.add("hidden"),unlockBackgroundScroll()},window.handleDispenseRecipientChange=function(){const l=document.getElementById("dispense-recipient"),e=document.getElementById("dispense-companion-container"),s=document.getElementById("dispense-companion-name");l.value==="\u0647\u0645\u0631\u0627\u0647"?(e.classList.remove("hidden"),s.setAttribute("required","required")):(e.classList.add("hidden"),s.removeAttribute("required"),s.value="")},window.calculateNextDispenseVisit=function(){const l=document.getElementById("dispense-patient-id").value,e=window.patients.find(c=>c.id===l);if(!e)return;const s=parseFloat(document.getElementById("dispense-quantity").value)||0,n=parseFloat(e.currentDosage)||0,t=document.getElementById("dispense-date").value,i=document.getElementById("dispense-drug-display").value,a=document.getElementById("dispense-next-visit"),d=document.getElementById("dispense-days-calculated");if(i==="\u0631\u0648\u0627\u0646 \u062F\u0631\u0645\u0627\u0646\u06CC"||i==="\u0628\u062F\u0648\u0646 \u062F\u0627\u0631\u0648 (\u0641\u0642\u0637 \u0631\u0648\u0627\u0646\u200C\u062F\u0631\u0645\u0627\u0646\u06CC)"||n===0){a.value="\u0628\u062F\u0648\u0646 \u0646\u06CC\u0627\u0632 \u0628\u0647 \u0645\u0631\u0627\u062C\u0639\u0647 \u062F\u0627\u0631\u0648\u06CC\u06CC",d.innerText="\u0631\u0648\u0627\u0646 \u062F\u0631\u0645\u0627\u0646\u06CC";return}if(s<=0){a.value="\u0645\u0646\u062A\u0638\u0631 \u062A\u0639\u06CC\u06CC\u0646 \u0645\u0642\u062F\u0627\u0631...",d.innerText="\u06F0 \u0631\u0648\u0632 \u062F\u06CC\u06AF\u0631";return}const o=Math.floor(s/n);if(o<=0){a.value="\u0645\u0642\u062F\u0627\u0631 \u062F\u0627\u0631\u0648 \u0646\u0627\u06A9\u0627\u0641\u06CC \u0627\u0633\u062A",d.innerText="\u06F0 \u0631\u0648\u0632 \u062F\u06CC\u06AF\u0631";return}const r=addDaysToJalali(t,o);a.value=toPersianDigits(r),d.innerText=`${toPersianDigits(o)} \u0631\u0648\u0632 \u062F\u06CC\u06AF\u0631`},window.handleDispenseSubmit=function(l){l.preventDefault();const e=document.getElementById("dispense-patient-id").value,s=document.getElementById("dispense-date").value,n=document.getElementById("dispense-drug-display").value,t=parseFloat(document.getElementById("dispense-quantity").value)||0,i=document.getElementById("dispense-next-visit").value,a=document.getElementById("dispense-recipient").value,d=document.getElementById("dispense-companion-name").value||"",o=window.patients.findIndex(r=>r.id===e);if(o>-1){const r=window.patients[o];r.lastDispenseDate=s,r.dispenseHistory=r.dispenseHistory||[],r.dispenseHistory.unshift({id:crypto.randomUUID(),date:s,drug:n,quantity:t,nextVisit:i,recipient:a,companion:d,recordedBy:window.staff?.doctors?.[0]||"\u0633\u06CC\u0633\u062A\u0645"}),dbPutRecord("patients",r),triggerBackupReminder(),showToast("\u062B\u0628\u062A \u0627\u0631\u0627\u0626\u0647 \u062F\u0627\u0631\u0648 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u0627\u0646\u062C\u0627\u0645 \u0634\u062F \u0648 \u062F\u0631 \u062A\u0627\u0631\u06CC\u062E\u0686\u0647 \u067E\u0631\u0648\u0646\u062F\u0647 \u0630\u062E\u06CC\u0631\u0647 \u06AF\u0631\u062F\u06CC\u062F."),closeDispenseModal(),renderDispenseList()}};function openDetailsModal(l,e="base"){if(activePatientForModal=window.patients.find(t=>t.id===l),!activePatientForModal)return;const s=activePatientForModal,n=s.fullName||s.name+" "+s.lastname;document.getElementById("details-modal-title").innerHTML=`\u067E\u0631\u0648\u0646\u062F\u0647 \u067E\u0632\u0634\u06A9\u06CC \u0628\u06CC\u0645\u0627\u0631 <span class="mx-2 text-teal-200">|</span> ${escapeHTML(n)} <span class="text-teal-200 font-yekan text-[11px] px-2 py-0.5 bg-teal-800/80 rounded border border-teal-700 mr-2 shadow-sm">\u06A9\u062F: ${toPersianDigits(s.code)}</span>`,isModalEditMode=!1,document.getElementById("details-modal").classList.remove("hidden"),lockBackgroundScroll(),switchModalTab(e),document.getElementById("btn-modal-action-edit").onclick=()=>{closeDetailsModal(),triggerEditMode(l)},document.getElementById("btn-modal-action-print").onclick=()=>{openPrintSectionsModal(l)}}function closeDetailsModal(){document.getElementById("details-modal").classList.add("hidden"),unlockBackgroundScroll(),activePatientForModal=null,isModalEditMode=!1;const l=document.getElementById("details-modal-body");l&&(l.innerHTML="")}function switchModalTab(l){activeModalTab=l,isModalEditMode=!1;const e=document.getElementById("modal-tab-btn-base"),s=document.getElementById("modal-tab-btn-visits"),n=document.getElementById("modal-tab-btn-calls"),t=document.getElementById("modal-tab-btn-history"),i=document.getElementById("modal-tab-btn-dispense"),a=document.getElementById("modal-tab-btn-reviews");[e,s,n,t,i,a].forEach(r=>{r&&(r.className="px-4 py-2 text-xs font-bold text-slate-500 border-b-2 border-transparent transition whitespace-nowrap")});const d=document.getElementById(`modal-tab-btn-${l}`);d&&(d.className="px-4 py-2 text-xs font-bold border-b-2 border-teal-brand text-teal-brand transition whitespace-nowrap");const o=document.getElementById("btn-modal-action-inline-edit");l==="base"?o.classList.remove("hidden"):o.classList.add("hidden"),renderModalTabBody()}function toggleModalInlineEdit(l){if(isModalEditMode=l,renderModalTabBody(),l&&typeof jalaliDatepicker<"u"){jalaliDatepicker.startWatch();const e=document.getElementById("m-p-birthdate");if(e){const s=()=>{const n=e.value,t=calculateShamsiAge(n);t!==""&&(document.getElementById("m-p-age").value=t)};e.addEventListener("jdp:change",s),e.addEventListener("change",s),e.addEventListener("input",s)}}}window.handleModalDrugChange=function(){handleDrugDosageUnits("m-p-drug","m-dosage-container","m-dosage-unit"),togglePriorityField("m-p-drug","m-priority-container")},window.handleModalInitialDrugChange=function(){handleDrugDosageUnits("m-p-initialDrug","m-initial-dosage-container","m-initial-dosage-unit"),togglePriorityField("m-p-initialDrug","m-initial-priority-container")};function renderModalTabBody(){const l=document.getElementById("details-modal-body");l.innerHTML="";const e=activePatientForModal;if(activeModalTab==="base")if(isModalEditMode){let s="";window.staff.psychologists.forEach(n=>{s+=`<option value="${n}" ${e.counselor===n?"selected":""}>${n}</option>`}),l.innerHTML=`
                <form id="modalInlineEditForm" onsubmit="saveModalInlineChanges(event)" class="space-y-3 text-xs text-slate-700 animate-fade-in font-sans">
                    <div class="bg-amber-50 border border-amber-200 p-2.5 rounded-2xl flex items-center justify-between">
                        <span class="font-bold text-amber-800"><i class="fa-solid fa-triangle-exclamation ml-1"></i> \u062F\u0631 \u062D\u0627\u0644 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u062F\u0631\u062C\u0627 \u0648 \u0645\u0633\u062A\u0642\u06CC\u0645 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0628\u06CC\u0645\u0627\u0631</span>
                        <div class="flex gap-2">
                            <button type="button" onclick="toggleModalInlineEdit(false)" class="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 rounded-lg font-bold transition">\u0627\u0646\u0635\u0631\u0627\u0641</button>
                            <button type="submit" class="px-4 py-1.5 bg-teal-brand hover-bg-teal text-white rounded-lg font-bold transition">\u062B\u0628\u062A \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u067E\u0631\u0648\u0646\u062F\u0647</button>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                        <div>
                            <label class="block font-bold mb-1">\u06A9\u062F \u067E\u0631\u0648\u0646\u062F\u0647 <span class="text-red-500">*</span></label>
                            <input type="number" id="m-p-code" data-patient-id="${e.id}" oninput="validateQuickEditCodeField(this)" required class="w-full px-3 py-1.5 border rounded-xl outline-none focus:border-teal-brand font-yekan" value="${e.code}">
                            <span id="m-p-code-dup-err" class="text-[10px] text-red-500 hidden mt-1 block font-bold">\u0627\u06CC\u0646 \u06A9\u062F \u067E\u0631\u0648\u0646\u062F\u0647 \u0642\u0628\u0644\u0627\u064B \u0628\u0631\u0627\u06CC \u0628\u06CC\u0645\u0627\u0631 \u062F\u06CC\u06AF\u0631\u06CC \u062B\u0628\u062A \u0634\u062F\u0647 \u0627\u0633\u062A!</span>
                        </div>
                        <div>
                            <label class="block font-bold mb-1">\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC <span class="text-red-500">*</span></label>
                            <input type="text" id="m-p-fullName" required class="w-full px-3 py-1.5 border rounded-xl outline-none focus:border-teal-brand" value="${e.fullName||e.name+" "+e.lastname}">
                        </div>
                        <div>
                            <label class="block font-bold mb-1">\u06A9\u062F \u0645\u0644\u06CC <span class="text-slate-400 font-normal text-[10px]">(\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)</span></label>
                            <input type="text" id="m-p-nationalId" maxlength="10" class="w-full px-3 py-1.5 border rounded-xl outline-none focus:border-teal-brand font-yekan tracking-wider" value="${e.nationalId||""}">
                        </div>
                        <div>
                            <label class="block font-bold mb-1">\u062A\u0627\u0631\u06CC\u062E \u062A\u0648\u0644\u062F \u0634\u0645\u0633\u06CC <span class="text-red-500">*</span></label>
                            <input type="text" id="m-p-birthdate" data-jdp required class="w-full px-3 py-1.5 border rounded-xl outline-none text-center focus:border-teal-brand font-yekan" value="${e.birthdate}">
                        </div>
                        <div>
                            <label class="block font-bold mb-1">\u0634\u0645\u0627\u0631\u0647 \u062A\u0645\u0627\u0633 \u0627\u0636\u0637\u0631\u0627\u0631\u06CC <span class="text-red-500">*</span></label>
                            <input type="tel" id="m-p-phone" required class="w-full px-3 py-1.5 border rounded-xl outline-none focus:border-teal-brand text-left font-yekan tracking-wider" value="${escapeHTML(e.phone)}">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
                        <div>
                            <label class="block font-bold mb-1">\u062A\u0627\u0631\u06CC\u062E \u067E\u0630\u06CC\u0631\u0634 <span class="text-red-500">*</span></label>
                            <input type="text" id="m-p-admissionDate" data-jdp required class="w-full px-3 py-1.5 border rounded-xl outline-none text-center focus:border-teal-brand font-yekan" value="${e.admissionDate}">
                        </div>
                        <div>
                            <label class="block font-bold mb-1">\u0633\u0646 <span class="text-red-500">*</span></label>
                            <input type="number" id="m-p-age" required min="12" max="100" class="w-full px-3 py-1.5 border rounded-xl outline-none focus:border-teal-brand font-yekan" value="${escapeHTML(e.age)}">
                        </div>
                        <div>
                            <label class="block font-bold mb-1">\u0648\u0636\u0639\u06CC\u062A \u062A\u0627\u0647\u0644</label>
                            <select id="m-p-marital" class="w-full px-3 py-1.5 border rounded-xl outline-none focus:border-teal-brand">
                                <option value="\u0645\u062C\u0631\u062F" ${e.marital==="\u0645\u062C\u0631\u062F"?"selected":""}>\u0645\u062C\u0631\u062F</option>
                                <option value="\u0645\u062A\u0623\u0647\u0644" ${e.marital==="\u0645\u062A\u0623\u0647\u0644"?"selected":""}>\u0645\u062A\u0623\u0647\u0644</option>
                                <option value="\u0645\u0637\u0644\u0642\u0647 - \u0645\u062A\u0627\u0631\u06A9\u0647" ${e.marital==="\u0645\u0637\u0644\u0642\u0647 - \u0645\u062A\u0627\u0631\u06A9\u0647"?"selected":""}>\u0645\u0637\u0644\u0642\u0647 - \u0645\u062A\u0627\u0631\u06A9\u0647</option>
                                <option value="\u0647\u0645\u0633\u0631 \u0641\u0648\u062A \u0634\u062F\u0647" ${e.marital==="\u0647\u0645\u0633\u0631 \u0641\u0648\u062A \u0634\u062F\u0647"?"selected":""}>\u0647\u0645\u0633\u0631 \u0641\u0648\u062A \u0634\u062F\u0647</option>
                            </select>
                        </div>
                        <div>
                            <label class="block font-bold mb-1">\u0648\u0636\u0639\u06CC\u062A \u0627\u0634\u062A\u063A\u0627\u0644</label>
                            <select id="m-p-employment" class="w-full px-3 py-1.5 border rounded-xl outline-none focus:border-teal-brand">
                                <option value="\u0634\u0627\u063A\u0644" ${e.employment==="\u0634\u0627\u063A\u0644"?"selected":""}>\u0634\u0627\u063A\u0644</option>
                                <option value="\u0628\u06CC\u06A9\u0627\u0631" ${e.employment==="\u0628\u06CC\u06A9\u0627\u0631"?"selected":""}>\u0628\u06CC\u06A9\u0627\u0631</option>
                                <option value="\u0628\u0627\u0632\u0646\u0634\u0633\u062A\u0647" ${e.employment==="\u0628\u0627\u0632\u0646\u0634\u0633\u062A\u0647"?"selected":""}>\u0628\u0627\u0632\u0646\u0634\u0633\u062A\u0647</option>
                                <option value="\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632/\u062F\u0627\u0646\u0634\u062C\u0648" ${e.employment==="\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632/\u062F\u0627\u0646\u0634\u062C\u0648"?"selected":""}>\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632/\u062F\u0627\u0646\u0634\u062C\u0648</option>
                            </select>
                        </div>
                        <div>
                            <label class="block font-bold mb-1">\u0639\u0646\u0648\u0627\u0646 \u0634\u063A\u0644</label>
                            <input type="text" id="m-p-job" class="w-full px-3 py-1.5 border rounded-xl outline-none focus:border-teal-brand" value="${e.job||""}">
                        </div>
                        <div>
                            <label class="block font-bold mb-1">\u0645\u0634\u0627\u0648\u0631 (\u0631\u0648\u0627\u0646\u0634\u0646\u0627\u0633) <span class="text-red-500">*</span></label>
                            <select id="m-p-counselor" required class="w-full px-3 py-1.5 border rounded-xl outline-none focus:border-teal-brand">
                                ${s}
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 border-t pt-2.5">
                        <div>
                            <label class="block font-bold mb-1">\u0645\u0627\u062F\u0647 \u0645\u0635\u0631\u0641\u06CC \u0627\u0635\u0644\u06CC <span class="text-red-500">*</span></label>
                            <select id="m-p-substance" required class="w-full px-3 py-1.5 border rounded-xl outline-none">
                                <option value="\u062A\u0631\u06CC\u0627\u06A9" ${e.substance==="\u062A\u0631\u06CC\u0627\u06A9"?"selected":""}>\u062A\u0631\u06CC\u0627\u06A9</option>
                                <option value="\u0634\u06CC\u0631\u0647" ${e.substance==="\u0634\u06CC\u0631\u0647"?"selected":""}>\u0634\u06CC\u0631\u0647</option>
                                <option value="\u0647\u0631\u0648\u0626\u06CC\u0646" ${e.substance==="\u0647\u0631\u0648\u0626\u06CC\u0646"?"selected":""}>\u0647\u0631\u0648\u0626\u06CC\u0646</option>
                                <option value="\u06A9\u0631\u0627\u06A9" ${e.substance==="\u06A9\u0631\u0627\u06A9"?"selected":""}>\u06A9\u0631\u0627\u06A9</option>
                                <option value="\u0634\u06CC\u0634\u0647 (\u0645\u062A\u200C\u0622\u0645\u0641\u062A\u0627\u0645\u06CC\u0646)" ${e.substance==="\u0634\u06CC\u0634\u0647 (\u0645\u062A\u200C\u0622\u0645\u0641\u062A\u0627\u0645\u06CC\u0646)"?"selected":""}>\u0634\u06CC\u0634\u0647 (\u0645\u062A\u200C\u0622\u0645\u0641\u062A\u0627\u0645\u06CC\u0646)</option>
                                <option value="\u062A\u0631\u0627\u0645\u0627\u062F\u0648\u0644" ${e.substance==="\u062A\u0631\u0627\u0645\u0627\u062F\u0648\u0644"?"selected":""}>\u062A\u0631\u0627\u0645\u0627\u062F\u0648\u0644</option>
                                <option value="\u0645\u0627\u0631\u06CC\u062C\u0648\u0627\u0646\u0627 / \u06AF\u0644" ${e.substance==="\u0645\u0627\u0631\u06CC\u062C\u0648\u0627\u0646\u0627 / \u06AF\u0644"?"selected":""}>\u0645\u0627\u0631\u06CC\u062C\u0648\u0627\u0646\u0627 / \u06AF\u0644</option>
                                <option value="\u062D\u0634\u06CC\u0634" ${e.substance==="\u062D\u0634\u06CC\u0634"?"selected":""}>\u062D\u0634\u06CC\u0634</option>
                                <option value="\u0627\u0644\u06A9\u0644" ${e.substance==="\u0627\u0644\u06A9\u0644"?"selected":""}>\u0627\u0644\u06A9\u0644</option>
                                <option value="\u06A9\u0648\u06A9\u0627\u0626\u06CC\u0646" ${e.substance==="\u06A9\u0648\u06A9\u0627\u0626\u06CC\u0646"?"selected":""}>\u06A9\u0648\u06A9\u0627\u0626\u06CC\u0646</option>
                                <option value="\u0627\u06A9\u0633\u062A\u0627\u0632\u06CC" ${e.substance==="\u0627\u06A9\u0633\u062A\u0627\u0632\u06CC"?"selected":""}>\u0627\u06A9\u0633\u062A\u0627\u0632\u06CC</option>
                                <option value="\u0633\u0627\u06CC\u0631 \u0645\u0648\u0627\u062F \u0631\u0648\u0627\u0646\u06AF\u0631\u062F\u0627\u0646" ${e.substance==="\u0633\u0627\u06CC\u0631 \u0645\u0648\u0627\u062F \u0631\u0648\u0627\u0646\u06AF\u0631\u062F\u0627\u0646"?"selected":""}>\u0633\u0627\u06CC\u0631 \u0645\u0648\u0627\u062F \u0631\u0648\u0627\u0646\u06AF\u0631\u062F\u0627\u0646</option>
                                <option value="\u0645\u0635\u0631\u0641 \u0686\u0646\u062F\u06AF\u0627\u0646\u0647 (\u067E\u0644\u06CC\u200C\u0633\u0627\u0628\u0633\u062A\u0646\u0633)" ${e.substance==="\u0645\u0635\u0631\u0641 \u0686\u0646\u062F\u06AF\u0627\u0646\u0647 (\u067E\u0644\u06CC\u200C\u0633\u0627\u0628\u0633\u062A\u0646\u0633)"?"selected":""}>\u0645\u0635\u0631\u0641 \u0686\u0646\u062F\u06AF\u0627\u0646\u0647 (\u067E\u0644\u06CC\u200C\u0633\u0627\u0628\u0633\u062A\u0646\u0633)</option>
                            </select>
                        </div>
                        <div>
                            <label class="block font-bold mb-1">\u0633\u0646 \u0634\u0631\u0648\u0639 \u0645\u0635\u0631\u0641 (\u0633\u0627\u0644)</label>
                            <input type="number" id="m-p-startAge" class="w-full px-3 py-1.5 border rounded-xl outline-none font-yekan" value="${e.startAge||""}">
                        </div>
                        <div>
                            <label class="block font-bold mb-1">\u0645\u062F\u062A \u0645\u0635\u0631\u0641 (\u0633\u0627\u0644)</label>
                            <input type="number" id="m-p-duration" class="w-full px-3 py-1.5 border rounded-xl outline-none font-yekan" value="${e.duration||""}">
                        </div>
                        <div>
                            <label class="block font-bold mb-1">\u0633\u0648\u0627\u0628\u0642 \u062A\u0631\u06A9 \u0642\u0628\u0644\u06CC</label>
                            <select id="m-p-attempts" class="w-full px-3 py-1.5 border rounded-xl outline-none">
                                <option value="\u0647\u06CC\u0686\u200C\u0648\u0642\u062A \u062A\u0631\u06A9 \u0646\u06A9\u0631\u062F\u0647" ${e.attempts==="\u0647\u06CC\u0686\u200C\u0648\u0642\u062A \u062A\u0631\u06A9 \u0646\u06A9\u0631\u062F\u0647"?"selected":""}>\u0647\u06CC\u0686\u200C\u0648\u0642\u062A \u062A\u0631\u06A9 \u0646\u06A9\u0631\u062F\u0647</option>
                                <option value="\u06F1 \u0628\u0627\u0631" ${e.attempts==="\u06F1 \u0628\u0627\u0631"?"selected":""}>\u06F1 \u0628\u0627\u0631</option>
                                <option value="\u06F2 \u062A\u0627 \u06F5 \u0628\u0627\u0631" ${e.attempts==="\u06F2 \u062A\u0627 \u06F5 \u0628\u0627\u0631"?"selected":""}>\u06F2 \u062A\u0627 \u06F5 \u0628\u0627\u0631</option>
                                <option value="\u0628\u06CC\u0634 \u0627\u0632 \u06F5 \u0628\u0627\u0631" ${e.attempts==="\u0628\u06CC\u0634 \u0627\u0632 \u06F5 \u0628\u0627\u0631"?"selected":""}>\u0628\u06CC\u0634 \u0627\u0632 \u06F5 \u0628\u0627\u0631</option>
                            </select>
                        </div>
                    </div>

                    <!-- Initial Treatment Settings inside Inline Modal (kept fully in sync with the "\u0628\u0631\u0646\u0627\u0645\u0647 \u062F\u0631\u0645\u0627\u0646\u06CC \u0627\u0648\u0644\u06CC\u0647" section of the Full Edit form: initialDrug / initialDosage / initialPriority) -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 border-t pt-2.5">
                        <div>
                            <label class="block font-bold mb-1">\u062F\u0631\u0645\u0627\u0646 / \u067E\u0631\u0648\u062A\u06A9\u0644 \u062F\u0627\u0631\u0648\u06CC\u06CC \u0627\u0648\u0644\u06CC\u0647 <span class="text-red-500">*</span></label>
                            <select id="m-p-initialDrug" required onchange="handleModalInitialDrugChange()" class="w-full px-3 py-1.5 border rounded-xl outline-none">
                                <option value="\u0631\u0648\u0627\u0646 \u062F\u0631\u0645\u0627\u0646\u06CC" ${e.initialDrug==="\u0631\u0648\u0627\u0646 \u062F\u0631\u0645\u0627\u0646\u06CC"||e.initialDrug==="\u0628\u062F\u0648\u0646 \u062F\u0627\u0631\u0648 (\u0641\u0642\u0637 \u0631\u0648\u0627\u0646\u200C\u062F\u0631\u0645\u0627\u0646\u06CC)"?"selected":""}>\u0631\u0648\u0627\u0646 \u062F\u0631\u0645\u0627\u0646\u06CC</option>
                                <option value="\u0634 \u0645\u062A\u0627\u062F\u0648\u0646" ${e.initialDrug==="\u0634 \u0645\u062A\u0627\u062F\u0648\u0646"||e.initialDrug==="\u0634\u0631\u0628\u062A \u0645\u062A\u0627\u062F\u0648\u0646"?"selected":""}>\u0634 \u0645\u062A\u0627\u062F\u0648\u0646</option>
                                <option value="\u0642 \u0645\u062A\u0627\u062F\u0648\u0646" ${e.initialDrug==="\u0642 \u0645\u062A\u0627\u062F\u0648\u0646"||e.initialDrug==="\u0642\u0631\u0635 \u0645\u062A\u0627\u062F\u0648\u0646"?"selected":""}>\u0642 \u0645\u062A\u0627\u062F\u0648\u0646</option>
                                <option value="\u0628\u0648\u067E\u0631\u0646\u0648\u0631\u0641\u06CC\u0646" ${e.initialDrug==="\u0628\u0648\u067E\u0631\u0646\u0648\u0631\u0641\u06CC\u0646"||e.initialDrug==="\u0642\u0631\u0635 \u0628\u06F2 (\u0628\u0648\u067E\u0631\u0646\u0648\u0631\u0641\u06CC\u0646)"?"selected":""}>\u0628\u0648\u067E\u0631\u0646\u0648\u0631\u0641\u06CC\u0646</option>
                                <option value="\u0627\u067E\u06CC\u0648\u0645" ${e.initialDrug==="\u0627\u067E\u06CC\u0648\u0645"||e.initialDrug==="\u0634\u0631\u0628\u062A \u0627\u0648\u067E\u06CC\u0648\u0645"?"selected":""}>\u0627\u067E\u06CC\u0648\u0645</option>
                            </select>
                        </div>
                        <div id="m-initial-dosage-container">
                            <label class="block font-bold mb-1">\u062F\u0648\u0632 \u062F\u0627\u0631\u0648\u06CC\u06CC \u0627\u0648\u0644\u06CC\u0647 <span class="text-red-500">*</span></label>
                            <div class="relative rounded-xl shadow-sm">
                                <input type="number" id="m-p-initialDosage" step="0.1" class="w-full px-3 py-1.5 border rounded-xl outline-none font-yekan" value="${e.initialDosage||0}">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span id="m-initial-dosage-unit" class="text-[10px] text-gray-500 font-bold">\u0648\u0627\u062D\u062F</span>
                                </div>
                            </div>
                        </div>
                        <!-- Opium priority for the initial protocol \u2014 shown only when initial drug is \u0627\u067E\u06CC\u0648\u0645 -->
                        <div id="m-initial-priority-container" class="${e.initialDrug==="\u0627\u067E\u06CC\u0648\u0645"?"":"hidden"}">
                            <label class="block font-bold mb-1">\u0627\u0648\u0644\u0648\u06CC\u062A \u0627\u067E\u06CC\u0648\u0645 (\u0627\u0648\u0644\u06CC\u0647)</label>
                            <select id="m-p-initialPriority" class="w-full px-3 py-1.5 border rounded-xl outline-none">
                                <option value="" ${e.initialPriority?"":"selected"}>\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F</option>
                                <option value="A1" ${e.initialPriority==="A1"?"selected":""}>A1</option>
                                <option value="A2" ${e.initialPriority==="A2"?"selected":""}>A2</option>
                                <option value="B1" ${e.initialPriority==="B1"?"selected":""}>B1</option>
                                <option value="B2" ${e.initialPriority==="B2"?"selected":""}>B2</option>
                                <option value="B3" ${e.initialPriority==="B3"?"selected":""}>B3</option>
                            </select>
                        </div>
                    </div>

                    <!-- Treatment Settings inside Inline Modal -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 border-t pt-2.5">
                        <div>
                            <label class="block font-bold mb-1">\u062F\u0631\u0645\u0627\u0646 \u062F\u0627\u0631\u0648\u06CC\u06CC \u0641\u0639\u0644\u06CC <span class="text-red-500">*</span></label>
                            <select id="m-p-drug" required onchange="handleModalDrugChange()" class="w-full px-3 py-1.5 border rounded-xl outline-none">
                                <option value="\u0631\u0648\u0627\u0646 \u062F\u0631\u0645\u0627\u0646\u06CC" ${e.currentDrug==="\u0631\u0648\u0627\u0646 \u062F\u0631\u0645\u0627\u0646\u06CC"||e.currentDrug==="\u0628\u062F\u0648\u0646 \u062F\u0627\u0631\u0648 (\u0641\u0642\u0637 \u0631\u0648\u0627\u0646\u200C\u062F\u0631\u0645\u0627\u0646\u06CC)"?"selected":""}>\u0631\u0648\u0627\u0646 \u062F\u0631\u0645\u0627\u0646\u06CC</option>
                                <option value="\u0634 \u0645\u062A\u0627\u062F\u0648\u0646" ${e.currentDrug==="\u0634 \u0645\u062A\u0627\u062F\u0648\u0646"||e.currentDrug==="\u0634\u0631\u0628\u062A \u0645\u062A\u0627\u062F\u0648\u0646"?"selected":""}>\u0634 \u0645\u062A\u0627\u062F\u0648\u0646</option>
                                <option value="\u0642 \u0645\u062A\u0627\u062F\u0648\u0646" ${e.currentDrug==="\u0642 \u0645\u062A\u0627\u062F\u0648\u0646"||e.currentDrug==="\u0642\u0631\u0635 \u0645\u062A\u0627\u062F\u0648\u0646"?"selected":""}>\u0642 \u0645\u062A\u0627\u062F\u0648\u0646</option>
                                <option value="\u0628\u0648\u067E\u0631\u0646\u0648\u0631\u0641\u06CC\u0646" ${e.currentDrug==="\u0628\u0648\u067E\u0631\u0646\u0648\u0631\u0641\u06CC\u0646"||e.currentDrug==="\u0642\u0631\u0635 \u0628\u06F2 (\u0628\u0648\u067E\u0631\u0646\u0648\u0631\u0641\u06CC\u0646)"?"selected":""}>\u0628\u0648\u067E\u0631\u0646\u0648\u0631\u0641\u06CC\u0646</option>
                                <option value="\u0627\u067E\u06CC\u0648\u0645" ${e.currentDrug==="\u0627\u067E\u06CC\u0648\u0645"||e.currentDrug==="\u0634\u0631\u0628\u062A \u0627\u0648\u067E\u06CC\u0648\u0645"?"selected":""}>\u0627\u067E\u06CC\u0648\u0645</option>
                            </select>
                        </div>
                        <div id="m-dosage-container">
                            <label class="block font-bold mb-1">\u062F\u0648\u0632 \u062F\u0627\u0631\u0648\u06CC\u06CC \u0641\u0639\u0644\u06CC <span class="text-red-500">*</span></label>
                            <div class="relative rounded-xl shadow-sm">
                                <input type="number" id="m-p-dosage" step="0.1" class="w-full px-3 py-1.5 border rounded-xl outline-none font-yekan" value="${e.currentDosage||0}">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span id="m-dosage-unit" class="text-[10px] text-gray-500 font-bold">\u0648\u0627\u062D\u062F</span>
                                </div>
                            </div>
                        </div>
                        <!-- NEW: Opium priority field \u2014 shown only when current drug is \u0627\u067E\u06CC\u0648\u0645, editable here (quick edit) -->
                        <div id="m-priority-container" class="${e.currentDrug==="\u0627\u067E\u06CC\u0648\u0645"?"":"hidden"}">
                            <label class="block font-bold mb-1">\u0627\u0648\u0644\u0648\u06CC\u062A \u0627\u067E\u06CC\u0648\u0645</label>
                            <select id="m-p-priority" class="w-full px-3 py-1.5 border rounded-xl outline-none">
                                <option value="" ${e.currentPriority?"":"selected"}>\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F</option>
                                <option value="A1" ${e.currentPriority==="A1"?"selected":""}>A1</option>
                                <option value="A2" ${e.currentPriority==="A2"?"selected":""}>A2</option>
                                <option value="B1" ${e.currentPriority==="B1"?"selected":""}>B1</option>
                                <option value="B2" ${e.currentPriority==="B2"?"selected":""}>B2</option>
                                <option value="B3" ${e.currentPriority==="B3"?"selected":""}>B3</option>
                            </select>
                        </div>
                    </div>

                    <!-- Controls inside Inline Modal -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 border-t pt-2.5">
                        <div>
                            <label class="block font-bold mb-1">\u0648\u0636\u0639\u06CC\u062A \u067E\u0631\u0648\u0646\u062F\u0647 <span class="text-red-500">*</span></label>
                            <select id="m-p-status" required onchange="toggleModalDeactiveReasonField()" class="w-full px-3 py-1.5 border rounded-xl outline-none">
                                <option value="\u0641\u0639\u0627\u0644" ${e.status==="\u0641\u0639\u0627\u0644"||e.status==="\u0641\u0639\u0627\u0644 \u0645\u06CC\u200C\u0628\u0627\u0634\u062F (\u062F\u0631 \u062D\u0627\u0644 \u0645\u0631\u0627\u062C\u0639\u0647 / \u062F\u0631 \u0631\u0627\u0647)"?"selected":""}>\u0641\u0639\u0627\u0644</option>
                                <option value="\u063A\u06CC\u0631\u0641\u0639\u0627\u0644" ${e.status==="\u063A\u06CC\u0631\u0641\u0639\u0627\u0644"?"selected":""}>\u063A\u06CC\u0631\u0641\u0639\u0627\u0644</option>
                            </select>
                        </div>
                        <div>
                            <label class="block font-bold mb-1">\u0646\u0638\u0645 \u062D\u0636\u0648\u0631 \u062F\u0631 \u0645\u0631\u06A9\u0632</label>
                            <select id="m-p-attendance" class="w-full px-3 py-1.5 border rounded-xl outline-none">
                                <option value="\u0645\u0646\u0638\u0645" ${e.attendance==="\u0645\u0646\u0638\u0645"?"selected":""}>\u0645\u0646\u0638\u0645</option>
                                <option value="\u0646\u0627\u0645\u0646\u0638\u0645" ${e.attendance==="\u0646\u0627\u0645\u0646\u0638\u0645"?"selected":""}>\u0646\u0627\u0645\u0646\u0638\u0645</option>
                                <option value="\u063A\u06CC\u0628\u062A" ${e.attendance==="\u063A\u06CC\u0628\u062A"?"selected":""}>\u063A\u06CC\u0628\u062A</option>
                            </select>
                        </div>
                        <div>
                            <label class="block font-bold mb-1">\u067E\u0648\u0634\u0634 \u0628\u06CC\u0645\u0647\u200C\u0627\u06CC</label>
                            <select id="m-p-insurance" class="w-full px-3 py-1.5 border rounded-xl outline-none">
                                <option value="\u062F\u0627\u0631\u062F" ${e.insurance==="\u062F\u0627\u0631\u062F"?"selected":""}>\u062F\u0627\u0631\u062F</option>
                                <option value="\u0646\u062F\u0627\u0631\u062F" ${e.insurance==="\u0646\u062F\u0627\u0631\u062F"?"selected":""}>\u0646\u062F\u0627\u0631\u062F</option>
                            </select>
                        </div>
                        <div>
                            <label class="block font-bold mb-1">\u062B\u0628\u062A \u062F\u0631 \u0633\u0627\u0645\u0627\u0646\u0647</label>
                            <select id="m-p-systemRegistered" class="w-full px-3 py-1.5 border rounded-xl outline-none">
                                <option value="\u0628\u0644\u0647" ${(e.systemRegistered||"\u062E\u06CC\u0631")==="\u0628\u0644\u0647"?"selected":""}>\u0628\u0644\u0647</option>
                                <option value="\u062E\u06CC\u0631" ${(e.systemRegistered||"\u062E\u06CC\u0631")==="\u062E\u06CC\u0631"?"selected":""}>\u062E\u06CC\u0631</option>
                            </select>
                        </div>
                    </div>

                    <!-- Reason of Inactivity inside details Modal Edit mode -->
                    <div id="m-deactive-reason-container" class="${e.status==="\u063A\u06CC\u0631\u0641\u0639\u0627\u0644"?"":"hidden"} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 border-t pt-2.5">
                        <div>
                            <label class="block font-bold mb-1.5 font-semibold text-rose-700">\u0639\u0644\u062A \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0634\u062F\u0646 \u067E\u0631\u0648\u0646\u062F\u0647 <span class="text-red-500">*</span></label>
                            <select id="m-p-deactiveReason" class="w-full px-3 py-1.5 border rounded-xl outline-none border-rose-300">
                                <option value="" disabled ${e.deactiveReason?"":"selected"}>\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F</option>
                                <option value="\u0628\u0647\u0628\u0648\u062F\u06CC \u06A9\u0627\u0645\u0644 (\u062A\u0631\u062E\u06CC\u0635)" ${e.deactiveReason==="\u0628\u0647\u0628\u0648\u062F\u06CC \u06A9\u0627\u0645\u0644 (\u062A\u0631\u062E\u06CC\u0635)"?"selected":""}>\u0628\u0647\u0628\u0648\u062F\u06CC \u06A9\u0627\u0645\u0644 (\u062A\u0631\u062E\u06CC\u0635)</option>
                                <option value="\u0627\u0646\u0635\u0631\u0627\u0641 \u0627\u0632 \u062F\u0631\u0645\u0627\u0646" ${e.deactiveReason==="\u0627\u0646\u0635\u0631\u0627\u0641 \u0627\u0632 \u062F\u0631\u0645\u0627\u0646"?"selected":""}>\u0627\u0646\u0635\u0631\u0627\u0641 \u0627\u0632 \u062F\u0631\u0645\u0627\u0646</option>
                                <option value="\u0627\u0646\u062A\u0642\u0627\u0644 \u0628\u0647 \u0645\u0631\u06A9\u0632 \u062F\u06CC\u06AF\u0631" ${e.deactiveReason==="\u0627\u0646\u062A\u0642\u0627\u0644 \u0628\u0647 \u0645\u0631\u06A9\u0632 \u062F\u06CC\u06AF\u0631"?"selected":""}>\u0627\u0646\u062A\u0642\u0627\u0644 \u0628\u0647 \u0645\u0631\u06A9\u0632 \u062F\u06CC\u06AF\u0631</option>
                                <option value="\u0641\u0648\u062A" ${e.deactiveReason==="\u0641\u0648\u062A"?"selected":""}>\u0641\u0648\u062A</option>
                                <option value="\u0639\u062F\u0645 \u0645\u0631\u0627\u062C\u0639\u0647 \u0637\u0648\u0644\u0627\u0646\u06CC \u0645\u062F\u062A" ${e.deactiveReason==="\u0639\u062F\u0645 \u0645\u0631\u0627\u062C\u0639\u0647 \u0637\u0648\u0644\u0627\u0646\u06CC \u0645\u062F\u062A"?"selected":""}>\u0639\u062F\u0645 \u0645\u0631\u0627\u062C\u0639\u0647 \u0637\u0648\u0644\u0627\u0646\u06CC \u0645\u062F\u062A</option>
                                <option value="\u0645\u0634\u06A9\u0644\u0627\u062A \u0645\u0627\u0644\u06CC" ${e.deactiveReason==="\u0645\u0634\u06A9\u0644\u0627\u062A \u0645\u0627\u0644\u06CC"?"selected":""}>\u0645\u0634\u06A9\u0644\u0627\u062A \u0645\u0627\u0644\u06CC</option>
                                <option value="\u0639\u0644\u062A \u0646\u0627\u0645\u0634\u062E\u0635" ${e.deactiveReason==="\u0639\u0644\u062A \u0646\u0627\u0645\u0634\u062E\u0635"?"selected":""}>\u0639\u0644\u062A \u0646\u0627\u0645\u0634\u062E\u0635</option>
                                <option value="\u0633\u0627\u06CC\u0631" ${e.deactiveReason==="\u0633\u0627\u06CC\u0631"?"selected":""}>\u0633\u0627\u06CC\u0631</option>
                            </select>
                        </div>
                        <div>
                            <label class="block font-bold mb-1">\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0639\u0644\u062A \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0634\u062F\u0646 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)</label>
                            <input type="text" id="m-p-deactiveNotes" class="w-full px-3 py-1.5 border rounded-xl outline-none" value="${escapeHTML(e.deactiveNotes||"")}" placeholder="\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0628\u06CC\u0634\u062A\u0631...">
                        </div>
                    </div>

                    <!-- Checkboxes Disease history in modal -->
                    <div class="border-t pt-2.5 space-y-2">
                        <label class="block font-bold">\u0628\u06CC\u0645\u0627\u0631\u06CC\u200C\u0647\u0627\u06CC \u0632\u0645\u06CC\u0646\u0647\u200C\u0627\u06CC (\u0628\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u062A\u06CC\u06A9\u200C\u0647\u0627):</label>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-1.5 bg-slate-50 p-2 rounded-xl border">
                            <label class="flex items-center space-x-1 space-x-reverse"><input type="checkbox" name="m-p-med" value="\u0628\u06CC\u0645\u0627\u0631\u06CC \u06A9\u0628\u062F\u06CC" ${e.medHistory&&e.medHistory.includes("\u0628\u06CC\u0645\u0627\u0631\u06CC \u06A9\u0628\u062F\u06CC")?"checked":""} class="rounded text-teal-brand"> <span>\u0628\u06CC\u0645\u0627\u0631\u06CC \u06A9\u0628\u062F\u06CC</span></label>
                            <label class="flex items-center space-x-1 space-x-reverse"><input type="checkbox" name="m-p-med" value="\u062F\u06CC\u0627\u0628\u062A" ${e.medHistory&&e.medHistory.includes("\u062F\u06CC\u0627\u0628\u062A")?"checked":""} class="rounded text-teal-brand"> <span>\u062F\u06CC\u0627\u0628\u062A</span></label>
                            <label class="flex items-center space-x-1 space-x-reverse"><input type="checkbox" name="m-p-med" value="\u0641\u0634\u0627\u0631 \u062E\u0648\u0646" ${e.medHistory&&e.medHistory.includes("\u0641\u0634\u0627\u0631 \u062E\u0648\u0646")?"checked":""} class="rounded text-teal-brand"> <span>\u0641\u0634\u0627\u0631 \u062E\u0648\u0646</span></label>
                            <label class="flex items-center space-x-1 space-x-reverse"><input type="checkbox" name="m-p-med" value="\u0635\u0631\u0639" ${e.medHistory&&e.medHistory.includes("\u0635\u0631\u0639")?"checked":""} class="rounded text-teal-brand"> <span>\u0635\u0631\u0639</span></label>
                            <label class="flex items-center space-x-1 space-x-reverse"><input type="checkbox" name="m-p-med" value="\u0627\u0641\u0633\u0631\u062F\u06AF\u06CC" ${e.medHistory&&e.medHistory.includes("\u0627\u0641\u0633\u0631\u062F\u06AF\u06CC")?"checked":""} class="rounded text-teal-brand"> <span>\u0627\u0641\u0633\u0631\u062F\u06AF\u06CC</span></label>
                            <label class="flex items-center space-x-1 space-x-reverse"><input type="checkbox" name="m-p-med" value="\u0627\u062E\u062A\u0644\u0627\u0644 \u0627\u0636\u0637\u0631\u0627\u0628\u06CC" ${e.medHistory&&e.medHistory.includes("\u0627\u062E\u062A\u0644\u0627\u0644 \u0627\u0636\u0637\u0631\u0627\u0628\u06CC")?"checked":""} class="rounded text-teal-brand"> <span>\u0627\u062E\u062A\u0644\u0627\u0644 \u0627\u0636\u0637\u0631\u0627\u0628\u06CC</span></label>
                            <label class="flex items-center space-x-1 space-x-reverse"><input type="checkbox" name="m-p-med" value="\u0628\u06CC\u0645\u0627\u0631\u06CC \u06A9\u0644\u06CC\u0648\u06CC" ${e.medHistory&&e.medHistory.includes("\u0628\u06CC\u0645\u0627\u0631\u06CC \u06A9\u0644\u06CC\u0648\u06CC")?"checked":""} class="rounded text-teal-brand"> <span>\u0628\u06CC\u0645\u0627\u0631\u06CC \u06A9\u0644\u06CC\u0648\u06CC</span></label>
                            <label class="flex items-center space-x-1 space-x-reverse"><input type="checkbox" name="m-p-med" value="\u0646\u0627\u0631\u0633\u0627\u06CC\u06CC \u0642\u0644\u0628\u06CC" ${e.medHistory&&e.medHistory.includes("\u0646\u0627\u0631\u0633\u0627\u06CC\u06CC \u0642\u0644\u0628\u06CC")?"checked":""} class="rounded text-teal-brand"> <span>\u0646\u0627\u0631\u0633\u0627\u06CC\u06CC \u0642\u0644\u0628\u06CC</span></label>
                        </div>
                    </div>

                    <div>
                        <label class="block font-bold mb-1">\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0628\u0627\u0644\u06CC\u0646\u06CC \u0648 \u06CC\u0627\u062F\u062F\u0627\u0634\u062A\u200C\u0647\u0627\u06CC \u0631\u0648\u0627\u0646\u067E\u0632\u0634\u06A9\u06CC:</label>
                        <textarea id="m-p-medicalNotes" rows="2" class="w-full px-3 py-1.5 border rounded-xl outline-none focus:border-teal-brand">${escapeHTML(e.medicalNotes||"")}</textarea>
                    </div>

                    <div class="pt-2.5 border-t flex justify-end gap-2">
                        <button type="button" onclick="toggleModalInlineEdit(false)" class="px-6 py-1.5 border rounded-xl font-bold hover:bg-slate-50 transition">\u0627\u0646\u0635\u0631\u0627\u0641 \u0627\u0632 \u0648\u06CC\u0631\u0627\u06CC\u0634</button>
                        <button type="submit" class="px-8 py-1.5 bg-teal-brand text-white rounded-xl font-bold hover:bg-teal-700 shadow-md transition">\u0630\u062E\u06CC\u0631\u0647 \u0646\u0647\u0627\u06CC\u06CC \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A</button>
                    </div>
                </form>
            `,handleDrugDosageUnits("m-p-drug","m-dosage-container","m-dosage-unit"),togglePriorityField("m-p-drug","m-priority-container"),e.currentDrug==="\u0627\u067E\u06CC\u0648\u0645"&&(document.getElementById("m-p-priority").value=e.currentPriority||""),handleDrugDosageUnits("m-p-initialDrug","m-initial-dosage-container","m-initial-dosage-unit"),togglePriorityField("m-p-initialDrug","m-initial-priority-container"),e.initialDrug==="\u0627\u067E\u06CC\u0648\u0645"&&(document.getElementById("m-p-initialPriority").value=e.initialPriority||"")}else{const s=e.status==="\u0641\u0639\u0627\u0644"||e.status==="\u0641\u0639\u0627\u0644 \u0645\u06CC\u200C\u0628\u0627\u0634\u062F (\u062F\u0631 \u062D\u0627\u0644 \u0645\u0631\u0627\u062C\u0639\u0647 / \u062F\u0631 \u0631\u0627\u0647)",n=s?"from-emerald-500 to-teal-600":"from-rose-500 to-red-600",t=e.attendance==="\u0645\u0646\u0638\u0645"?"bg-emerald-50 text-emerald-700 border-emerald-200":e.attendance==="\u0646\u0627\u0645\u0646\u0638\u0645"?"bg-amber-50 text-amber-700 border-amber-200":"bg-rose-50 text-rose-700 border-rose-200";let i="\u062F\u0631 \u0637\u06CC \u062F\u0631\u0645\u0627\u0646",a="bg-amber-50 text-amber-700 border-amber-200 shadow-sm";if(e.status==="\u063A\u06CC\u0631\u0641\u0639\u0627\u0644")e.deactiveReason==="\u0628\u0647\u0628\u0648\u062F\u06CC \u06A9\u0627\u0645\u0644 (\u062A\u0631\u062E\u06CC\u0635)"?(i="\u0628\u0647\u0628\u0648\u062F \u06CC\u0627\u0641\u062A\u0647",a="bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm"):e.deactiveReason==="\u0627\u0646\u062A\u0642\u0627\u0644 \u0628\u0647 \u0645\u0631\u06A9\u0632 \u062F\u06CC\u06AF\u0631"?(i="\u0627\u062F\u0627\u0645\u0647 \u062F\u0631\u0645\u0631\u06A9\u0632 \u062F\u06CC\u06AF\u0631",a="bg-blue-50 text-blue-700 border-blue-200 shadow-sm"):(i="\u0642\u0637\u0639 \u062F\u0631\u0645\u0627\u0646",a="bg-rose-50 text-rose-700 border-rose-200 shadow-sm");else{const d=window.visits.filter(o=>o.patientId===e.id&&(o.testResult==="\u0645\u0646\u0641\u06CC"||o.testResult==="\u0645\u062B\u0628\u062A")).sort((o,r)=>r.date.localeCompare(o.date)||r.id.localeCompare(o.id));d.length>=4&&d.slice(0,4).every(r=>r.testResult==="\u0645\u0646\u0641\u06CC")&&(i="\u0628\u0647\u0628\u0648\u062F \u06CC\u0627\u0641\u062A\u0647",a="bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm")}l.innerHTML=`
                <!-- Top Controls (Moved from removed dark header) -->
                <div class="flex justify-between items-center mb-2">
                    <p class="text-[11px] text-slate-500 font-bold bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5"><i class="fa-solid fa-calendar-check text-slate-400"></i> \u062A\u0627\u0631\u06CC\u062E \u067E\u0630\u06CC\u0631\u0634: <strong class="text-slate-800 font-yekan">${toPersianDigits(e.admissionDate)}</strong></p>
                    <button onclick="toggleModalInlineEdit(true)" class="px-4 py-1.5 bg-teal-brand hover:bg-teal-700 text-white font-extrabold text-[11px] rounded-xl shadow-sm hover:shadow-md transition-all duration-150 flex items-center gap-1.5 border border-teal-400/20">
                        <i class="fa-solid fa-user-pen text-[10px]"></i> \u0648\u06CC\u0631\u0627\u06CC\u0634 \u0633\u0631\u06CC\u0639
                    </button>
                </div>

                <!-- Main Clinical Cards Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">

                    <!-- Card 1: Identity & General Metrics -->
                    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-2.5 space-y-2 flex flex-col h-full hover:border-slate-300/80 transition duration-200">
                        <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                            <i class="fa-solid fa-id-card text-teal-brand text-sm"></i>
                            <span>\u0645\u0634\u062E\u0635\u0627\u062A \u0647\u0648\u06CC\u062A\u06CC \u0648 \u0633\u0648\u0627\u0628\u0642</span>
                        </h4>

                        <div class="flex-1 flex flex-col justify-between space-y-2">
                            <!-- 6 Cards Grid (2 Columns x 3 Rows) -->
                            <div class="grid grid-cols-2 gap-2">
                                <!-- Right Column (3 Cards) -->
                                <div class="space-y-2 flex flex-col justify-between">
                                    <div class="p-1.5 bg-slate-50/50 rounded-xl border border-slate-100 hover:bg-slate-50 transition flex flex-col justify-center">
                                        <span class="text-[10px] text-slate-400 font-bold block mb-0.5">\u06A9\u062F \u0645\u0644\u06CC \u062F\u0647 \u0631\u0642\u0645\u06CC</span>
                                        <div class="flex items-center justify-between gap-1">
                                            <span class="font-bold text-slate-800 text-[11px] font-yekan tracking-wider">${e.nationalId?toPersianDigits(e.nationalId):'<span class="text-slate-400 font-normal">\u062B\u0628\u062A \u0646\u0634\u062F\u0647</span>'}</span>
                                            ${e.nationalId?`<button type="button" onclick="copyCleanValueToClipboard('${escapeHTML(e.nationalId)}', '\u06A9\u062F \u0645\u0644\u06CC')" title="\u06A9\u067E\u06CC \u06A9\u062F \u0645\u0644\u06CC \u0628\u0627 \u0641\u0631\u0645\u062A \u0627\u0633\u062A\u0627\u0646\u062F\u0627\u0631\u062F (\u0627\u0639\u062F\u0627\u062F \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)" class="text-slate-400 hover:text-teal-brand transition p-1 shrink-0"><i class="fa-regular fa-copy text-[11px]"></i></button>`:""}
                                        </div>
                                    </div>

                                    <div class="p-1.5 bg-slate-50/50 rounded-xl border border-slate-100 hover:bg-slate-50 transition flex flex-col justify-center">
                                        <span class="text-[10px] text-slate-400 font-bold block mb-0.5">\u0633\u0646 \u0628\u0627\u0644\u06CC\u0646\u06CC</span>
                                        <span class="font-extrabold text-slate-800 text-[11px]"><span class="font-yekan">${toPersianDigits(e.age)}</span> \u0633\u0627\u0644 <span class="text-[9px] text-slate-400 font-medium font-yekan">(${toPersianDigits(e.birthdate)})</span></span>
                                    </div>

                                    <div class="p-1.5 bg-amber-50/40 rounded-xl border border-amber-100 flex flex-col justify-center">
                                        <span class="text-[10px] text-amber-700 font-bold block mb-0.5">\u0645\u0627\u062F\u0647 \u0645\u0635\u0631\u0641\u06CC \u0627\u0635\u0644\u06CC \u0645\u0631\u0627\u062C\u0639</span>
                                        <div class="font-black text-amber-900 text-[11px] truncate" title="${escapeHTML(e.substance)}">
                                            ${escapeHTML(e.substance)} ${e.substanceOther?`(${escapeHTML(e.substanceOther)})`:""} 
                                            <span class="text-[9px] font-semibold text-amber-800 inline-block mr-1">(\u0633\u0627\u0628\u0642\u0647 <span class="font-yekan">${toPersianDigits(e.duration)}</span> \u0633\u0627\u0644)</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Left Column (3 Cards) -->
                                <div class="space-y-2 flex flex-col justify-between">
                                    <div class="p-1.5 bg-slate-50/50 rounded-xl border border-slate-100 hover:bg-slate-50 transition flex flex-col justify-center">
                                        <span class="text-[10px] text-slate-400 font-bold block mb-0.5">\u062A\u0644\u0641\u0646 \u0627\u0636\u0637\u0631\u0627\u0631\u06CC \u0645\u0631\u0627\u062C\u0639</span>
                                        <div class="flex items-center justify-between gap-1">
                                            <span class="font-bold text-slate-800 text-[11px] font-yekan tracking-wider" dir="ltr">${toPersianDigits(e.phone)}</span>
                                            <button type="button" onclick="copyCleanValueToClipboard('${escapeHTML(e.phone)}', '\u0634\u0645\u0627\u0631\u0647 \u062A\u0645\u0627\u0633')" title="\u06A9\u067E\u06CC \u0634\u0645\u0627\u0631\u0647 \u062A\u0645\u0627\u0633 \u0628\u0627 \u0641\u0631\u0645\u062A \u0627\u0633\u062A\u0627\u0646\u062F\u0627\u0631\u062F (\u0627\u0639\u062F\u0627\u062F \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)" class="text-slate-400 hover:text-teal-brand transition p-1 shrink-0"><i class="fa-regular fa-copy text-[11px]"></i></button>
                                        </div>
                                    </div>

                                    <div class="p-1.5 bg-slate-50/50 rounded-xl border border-slate-100 hover:bg-slate-50 transition flex flex-col justify-center">
                                        <span class="text-[10px] text-slate-400 font-bold block mb-0.5">\u0648\u0636\u0639\u06CC\u062A \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC \u0648 \u0627\u0634\u062A\u063A\u0627\u0644</span>
                                        <span class="font-bold text-slate-800 text-[11px]">${e.marital} <span class="text-slate-300 mx-1">/</span> ${e.employment}</span>
                                    </div>

                                    <div class="p-1.5 bg-teal-50/30 rounded-xl border border-teal-100/50 flex flex-col justify-center">
                                        <span class="text-[10px] text-teal-600 font-bold block mb-0.5">\u0645\u0634\u0627\u0648\u0631 (\u0631\u0648\u0627\u0646\u0634\u0646\u0627\u0633) \u0645\u0639\u0627\u0644\u062C</span>
                                        <span class="font-extrabold text-teal-900 text-[11px] flex items-center gap-1.5"><i class="fa-solid fa-user-doctor text-teal-500"></i> ${escapeHTML(e.counselor)||"\u062B\u0628\u062A \u0646\u0634\u062F\u0647"}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Bottom Full-Width Horizontal Card for Diseases -->
                            <div class="p-2 bg-red-50/30 rounded-xl border border-red-100/60 flex flex-col justify-center w-full">
                                <span class="text-[10px] text-red-700 font-bold block mb-1">\u0628\u06CC\u0645\u0627\u0631\u06CC\u200C\u0647\u0627\u06CC \u0632\u0645\u06CC\u0646\u0647\u200C\u0627\u06CC \u0648 \u0622\u0633\u06CC\u0628\u200C\u0647\u0627\u06CC \u0647\u0645\u0632\u0645\u0627\u0646</span>
                                <div class="flex flex-wrap gap-1.5">
                                    ${e.medHistory&&e.medHistory.length?e.medHistory.map(d=>`
                                        <span class="px-2 py-0.5 bg-red-50 text-red-700 border border-red-100/80 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-sm">
                                            <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                            ${escapeHTML(d)}
                                        </span>
                                    `).join(""):`
                                        <span class="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 flex items-center gap-1.5">
                                            <i class="fa-solid fa-circle-check text-emerald-500 text-[9px]"></i>
                                            \u0641\u0627\u0642\u062F \u0647\u0631\u06AF\u0648\u0646\u0647 \u0628\u06CC\u0645\u0627\u0631\u06CC \u0632\u0645\u06CC\u0646\u0647\u200C\u0627\u06CC \u06AF\u0632\u0627\u0631\u0634 \u0634\u062F\u0647
                                        </span>
                                    `}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Card 2: Treatment & Protocol Details -->
                    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-2.5 space-y-2 flex flex-col h-full hover:border-slate-300/80 transition duration-200">
                        <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                            <i class="fa-solid fa-prescription text-indigo-500 text-sm"></i>
                            <span>\u0628\u0631\u0646\u0627\u0645\u0647 \u062F\u0631\u0645\u0627\u0646\u06CC \u0648 \u067E\u0631\u0648\u062A\u06A9\u0644 \u062F\u0627\u0631\u0648\u06CC\u06CC</span>
                        </h4>

                        <div class="grid grid-cols-2 gap-1.5 flex-1">
                            <!-- Row 1: Treatment Status & Attendance -->
                            <div class="p-1.5 ${a.split(" ")[0]} rounded-xl border ${a.split(" ")[2]} flex flex-col justify-center">
                                <span class="text-[10px] ${a.split(" ")[1]} font-bold block mb-0.5">\u0648\u0636\u0639\u06CC\u062A \u062F\u0631\u0645\u0627\u0646\u06CC</span>
                                <span class="font-black text-slate-950 text-[10px] flex items-center gap-1">
                                    ${i==="\u0628\u0647\u0628\u0648\u062F \u06CC\u0627\u0641\u062A\u0647"?'<i class="fa-solid fa-check text-[10px] text-emerald-600"></i>':""} ${i}
                                </span>
                            </div>

                            <div class="p-1.5 ${t} rounded-xl border flex flex-col justify-center">
                                <span class="text-[10px] opacity-80 font-bold block mb-0.5">\u0646\u0638\u0645 \u062D\u0636\u0648\u0631</span>
                                <span class="font-extrabold text-[10px]">${e.attendance}</span>
                            </div>

                            <!-- Row 2: Current Drug & Initial Drug -->
                            <div class="p-1.5 bg-indigo-50/30 rounded-xl border border-indigo-100 hover:bg-indigo-50/50 transition flex flex-col justify-center">
                                <span class="text-[10px] text-indigo-600 font-bold block mb-0.5">\u062F\u0631\u0645\u0627\u0646 \u062F\u0627\u0631\u0648\u06CC\u06CC \u0641\u0639\u0644\u06CC</span>
                                <div class="flex items-center justify-between mt-0.5">
                                    <span class="font-extrabold text-indigo-950 text-[10px] block leading-relaxed">${escapeHTML(e.currentDrug)}${e.currentDrug==="\u0627\u067E\u06CC\u0648\u0645"&&e.currentPriority?`<span class="text-indigo-300 font-normal mx-0.5">/</span>${escapeHTML(e.currentPriority)}`:""}</span>
                                    ${e.currentDosage?`<span class="inline-block text-[9px] font-bold text-white bg-indigo-600 px-1 py-0.5 rounded font-yekan">\u062F\u0648\u0632: ${formatDosageHTML(e.currentDrug,e.currentDosage)}</span>`:""}
                                </div>
                            </div>

                            <div class="p-1.5 bg-slate-50/50 rounded-xl border border-slate-100 hover:bg-slate-50 transition flex flex-col justify-center">
                                <span class="text-[10px] text-slate-400 font-bold block mb-0.5">\u062F\u0631\u0645\u0627\u0646 \u0628\u062F\u0648 \u0648\u0631\u0648\u062F</span>
                                <div class="flex items-center justify-between mt-0.5">
                                    <span class="font-bold text-slate-700 text-[10px] block leading-relaxed">${escapeHTML(e.initialDrug)}${e.initialDrug==="\u0627\u067E\u06CC\u0648\u0645"&&e.initialPriority?`<span class="text-slate-300 font-normal mx-0.5">/</span>${escapeHTML(e.initialPriority)}`:""}</span>
                                    ${e.initialDosage?`<span class="inline-block text-[9px] font-bold text-white bg-slate-500 px-1 py-0.5 rounded font-yekan">\u062F\u0648\u0632: ${formatDosageHTML(e.initialDrug,e.initialDosage)}</span>`:""}
                                </div>
                            </div>

                            <!-- Row 3: Insurance & Start Age -->
                            <div class="p-1.5 bg-slate-50/50 rounded-xl border border-slate-100 hover:bg-slate-50 transition flex flex-col justify-center">
                                <span class="text-[10px] text-slate-400 font-bold block mb-0.5">\u067E\u0648\u0634\u0634 \u0628\u06CC\u0645\u0647\u200C\u0627\u06CC</span>
                                <span class="font-bold text-slate-800 text-[10px] flex items-center gap-1 mt-0.5">
                                    <i class="fa-solid ${e.insurance==="\u062F\u0627\u0631\u062F"?"fa-shield-halved text-blue-500":"fa-triangle-exclamation text-slate-400"} text-[10px]"></i>
                                    ${e.insurance==="\u062F\u0627\u0631\u062F"?"\u0641\u0639\u0627\u0644 \u0645\u06CC\u200C\u0628\u0627\u0634\u062F":"\u0641\u0627\u0642\u062F \u0628\u06CC\u0645\u0647"}
                                </span>
                            </div>

                            <div class="p-1.5 bg-slate-50/50 rounded-xl border border-slate-100 hover:bg-slate-50 transition flex flex-col justify-center">
                                <span class="text-[10px] text-slate-400 font-bold block mb-0.5">\u0634\u0631\u0648\u0639 \u0627\u0648\u0644\u06CC\u0646 \u0645\u0635\u0631\u0641</span>
                                <span class="font-bold text-slate-800 text-[10px] block mt-0.5">${e.startAge?`\u0633\u0646 <span class="font-yekan">${toPersianDigits(e.startAge)}</span> \u0633\u0627\u0644\u06AF\u06CC`:"\u062B\u0628\u062A \u0646\u0634\u062F\u0647"}</span>
                            </div>

                            <!-- Row 4: File Status & Deactivation Details -->
                            <div class="p-1.5 ${s?"bg-emerald-50/50 border-emerald-100":"bg-rose-50 border-rose-200"} rounded-xl border flex flex-col justify-center">
                                <span class="text-[10px] ${s?"text-emerald-600":"text-rose-600"} font-bold block mb-0.5">\u0648\u0636\u0639\u06CC\u062A \u067E\u0631\u0648\u0646\u062F\u0647</span>
                                <span class="font-extrabold ${s?"text-emerald-800":"text-rose-800"} text-[10px] flex items-center gap-1 mt-0.5">
                                    ${s?'<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_#10b981]"></span> \u0641\u0639\u0627\u0644':'<span class="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_4px_#f43f5e]"></span> \u063A\u06CC\u0631\u0641\u0639\u0627\u0644'}
                                </span>
                            </div>

                            ${e.status==="\u063A\u06CC\u0631\u0641\u0639\u0627\u0644"?`
                            <div class="p-1.5 bg-rose-50 rounded-xl border border-rose-200 flex flex-col justify-center overflow-hidden">
                                <span class="text-[10px] text-rose-600 font-bold block mb-0.5">\u0639\u0644\u062A \u0642\u0637\u0639\u06CC \u062F\u0631\u0645\u0627\u0646</span>
                                <span class="font-extrabold text-rose-800 text-[10px] flex items-center gap-1 truncate" title="${escapeHTML(e.deactiveReason)||"\u0646\u0627\u0645\u0639\u0644\u0648\u0645"}">
                                    <i class="fa-solid fa-ban text-rose-600 text-[9px]"></i> ${escapeHTML(e.deactiveReason)||"\u0646\u0627\u0645\u0639\u0644\u0648\u0645"}
                                </span>
                            </div>`:`
                            <div class="p-1.5 bg-slate-50/50 rounded-xl border border-slate-100 flex flex-col justify-center opacity-70">
                                <span class="text-[10px] text-slate-400 font-bold block mb-0.5">\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0642\u0637\u0639 \u062F\u0631\u0645\u0627\u0646</span>
                                <span class="font-bold text-slate-500 text-[10px] block mt-0.5">-</span>
                            </div>
                            `}
                        </div>
                    </div>
                </div>

                <!-- Clinical Notes Section -->
                <div class="bg-white rounded-2xl border border-slate-200/80 p-3 space-y-2 hover:border-slate-300/80 transition duration-200 mb-2">
                    <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2 mb-2">
                        <i class="fa-solid fa-comment-medical text-teal-brand text-sm"></i>
                        <span>\u06CC\u0627\u062F\u062F\u0627\u0634\u062A\u200C\u0647\u0627\u06CC \u0631\u0648\u0627\u0646\u067E\u0632\u0634\u06A9\u06CC \u0648 \u06AF\u0632\u0627\u0631\u0634\u0627\u062A \u0628\u0627\u0644\u06CC\u0646\u06CC</span>
                    </h4>
                    <p class="text-[11px] text-slate-700 bg-slate-50/50 px-3 py-2 rounded-xl border border-slate-100 leading-relaxed text-justify font-semibold whitespace-pre-line">
                        ${escapeHTML(e.medicalNotes)||"\u0647\u06CC\u0686 \u06CC\u0627\u062F\u062F\u0627\u0634\u062A \u0628\u0627\u0644\u06CC\u0646\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A."}
                    </p>
                </div>
            `}else if(activeModalTab==="visits"){const s=window.visits.filter(t=>t.patientId===e.id).sort((t,i)=>i.date.localeCompare(t.date)||i.id.localeCompare(t.id));if(!s.length){l.innerHTML='<div class="p-8 text-center text-xs text-slate-400 italic font-bold">\u062A\u0627\u06A9\u0646\u0648\u0646 \u0647\u06CC\u0686\u06AF\u0648\u0646\u0647 \u0648\u06CC\u0632\u06CC\u062A \u0628\u0627\u0644\u06CC\u0646\u06CC \u0637\u0648\u0644\u06CC \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0645\u0631\u0627\u062C\u0639 \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.</div>';return}let n='<div class="relative border-r-2 border-teal-brand pr-6 space-y-6">';s.forEach((t,i)=>{let a="";if(t.labRequest&&(a+='<span class="px-2 py-0.5 bg-blue-100 text-blue-700 border border-blue-200 rounded text-[9px] ml-1 shadow-sm">\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0622\u0632\u0645\u0627\u06CC\u0634</span>'),t.addictionTest&&(a+='<span class="px-2 py-0.5 bg-purple-100 text-purple-700 border border-purple-200 rounded text-[9px] ml-1 shadow-sm">\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u062A\u0633\u062A \u0627\u0639\u062A\u06CC\u0627\u062F</span>'),t.testResult){const d=t.testResult==="\u0645\u0646\u0641\u06CC"?"bg-emerald-100 text-emerald-700 border-emerald-200":"bg-rose-100 text-rose-700 border-rose-200";a+=`<span class="px-2 py-0.5 ${d} border rounded text-[9px] shadow-sm font-bold">\u062A\u0633\u062A ${t.testResult}</span>`}n+=`
                <div class="relative">
                    <span class="absolute -right-[31px] top-1 bg-teal-brand text-white rounded-full w-5 h-5 flex items-center justify-center text-[9px] font-bold border-2 border-white">${toPersianDigits(i+1)}</span>
                    <div class="bg-slate-50 border rounded-2xl p-4 space-y-2">
                        <div class="flex justify-between text-xs font-bold">
                            <span class="text-teal-brand">\u062A\u0627\u0631\u06CC\u062E \u0648\u06CC\u0632\u06CC\u062A: ${toPersianDigits(t.date)}</span>
                            <span class="text-slate-400">\u062B\u0628\u062A \u06A9\u0646\u0646\u062F\u0647: ${escapeHTML(t.recordedBy)}</span>
                        </div>
                        <div class="text-xs">\u067E\u0631\u0648\u062A\u06A9\u0644: <strong class="text-indigo-600">${escapeHTML(t.newDrug)} / ${formatDosageHTML(t.newDrug,t.newDosage)}</strong> | \u0648\u0636\u0639\u06CC\u062A \u0645\u0631\u0627\u062C\u0639\u0647: <strong class="text-amber-600">${escapeHTML(t.status)}</strong></div>
                        ${a?`<div class="flex flex-wrap gap-1 mt-1">${a}</div>`:""}
                        <p class="text-xs text-slate-600 leading-relaxed text-justify bg-white p-3 rounded-xl border border-slate-100">${escapeHTML(t.notes)}</p>
                        <div class="flex justify-end gap-2 pt-2 border-t border-slate-200/50">
                            <button onclick="editVisitRecord('${t.id}')" class="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[10px] font-bold transition flex items-center gap-1">
                                <i class="fa-solid fa-pen text-[9px]"></i> \u0648\u06CC\u0631\u0627\u06CC\u0634 \u0648\u06CC\u0632\u06CC\u062A
                            </button>
                            <button onclick="deleteVisitRecord('${t.id}')" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[10px] font-bold transition flex items-center gap-1">
                                <i class="fa-solid fa-trash-can text-[9px]"></i> \u062D\u0630\u0641 \u0648\u06CC\u0632\u06CC\u062A
                            </button>
                        </div>
                    </div>
                </div>
            `}),n+="</div>",l.innerHTML=n}else if(activeModalTab==="dispense"){const s=e.dispenseHistory||[];if(!s.length){l.innerHTML='<div class="p-8 text-center text-xs text-slate-400 italic font-bold border border-dashed border-slate-300 rounded-xl bg-slate-50/50">\u062A\u0627\u06A9\u0646\u0648\u0646 \u0647\u06CC\u0686 \u0633\u0627\u0628\u0642\u0647 \u0627\u0631\u0627\u0626\u0647\u200C \u062F\u0627\u0631\u0648\u06CC\u06CC \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0645\u0631\u0627\u062C\u0639 \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.</div>';return}let n=`
            <div class="mb-3">
                <h4 class="text-xs font-black text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <i class="fa-solid fa-pills text-teal-600"></i> \u0633\u0648\u0627\u0628\u0642 \u0648 \u062A\u0627\u0631\u06CC\u062E\u0686\u0647 \u062A\u062D\u0648\u06CC\u0644 \u062F\u0627\u0631\u0648
                </h4>
            </div>
            <div class="space-y-2 font-sans relative border-r-2 border-teal-brand pr-4">
        `;s.forEach((t,i)=>{const a=t.drug.includes("\u0642\u0631\u0635")||t.drug.includes("\u0642 ")||t.drug.includes("\u0628\u0648\u067E\u0631\u0646\u0648\u0631\u0641\u06CC\u0646")?"\u0645\u06CC\u0644\u06CC\u200C\u06AF\u0631\u0645":"\u0633\u06CC\u200C\u0633\u06CC";n+=`
                <div class="relative">
                    <span class="absolute -right-[23px] top-3 bg-teal-brand text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-bold border border-white z-10"><i class="fa-solid fa-check"></i></span>
                    <div class="bg-white border border-slate-200 px-3 py-2 rounded-lg hover:border-teal-300 hover:shadow-sm transition flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px] shadow-sm">

                        <!-- Date and icon -->
                        <div class="flex items-center gap-2 min-w-[120px]">
                            <span class="text-teal-700 font-bold flex items-center gap-1">
                                <i class="fa-regular fa-calendar text-teal-500 text-[10px]"></i>
                                <span>\u062A\u062D\u0648\u06CC\u0644:</span>
                                <span class="font-yekan text-xs">${toPersianDigits(t.date)}</span>
                            </span>
                        </div>

                        <!-- Drug & Quantity (Compact Badge) -->
                        <div class="flex items-center justify-between sm:justify-start gap-2 bg-slate-50 px-2 py-1 rounded border border-slate-100 flex-1 max-w-full sm:max-w-[180px]">
                            <span class="text-slate-500 font-semibold text-[10px]">\u062F\u0627\u0631\u0648:</span>
                            <div class="flex items-center gap-1">
                                <span class="font-extrabold text-indigo-700">${escapeHTML(t.drug)}</span>
                                <span class="font-yekan font-black text-indigo-900 border-r border-indigo-200 pr-1 mr-1">${toPersianDigits(t.quantity)} <span class="text-[9px] font-sans font-normal">${a}</span></span>
                            </div>
                        </div>

                        <!-- Next Appointment Date (Compact Badge) -->
                        <div class="flex items-center justify-between sm:justify-start gap-2 bg-amber-50/60 px-2 py-1 rounded border border-amber-100/50 flex-1 max-w-full sm:max-w-[170px]">
                            <span class="text-amber-700 font-semibold text-[10px]">\u0645\u0631\u0627\u062C\u0639\u0647 \u0628\u0639\u062F\u06CC:</span>
                            <span class="font-bold text-amber-950 font-yekan flex items-center gap-1">
                                <i class="fa-solid fa-clock-rotate-left text-amber-500 text-[9px]"></i>
                                ${toPersianDigits(t.nextVisit)}
                            </span>
                        </div>

                        <!-- Recipient & Reporter -->
                        <div class="flex items-center justify-between sm:justify-start gap-3">
                            <!-- Recipient Badge -->
                            <span class="px-1.5 py-0.5 rounded text-[10px] ${t.recipient==="\u062E\u0648\u062F\u0634"?"bg-emerald-50 text-emerald-700 border border-emerald-100":"bg-blue-50 text-blue-700 border border-blue-100"} font-bold whitespace-nowrap">
                                <i class="fa-solid fa-hand-holding-hand text-slate-400 ml-1"></i>
                                ${escapeHTML(t.recipient==="\u062E\u0648\u062F\u0634"?"\u062E\u0648\u062F \u0628\u06CC\u0645\u0627\u0631":"\u0647\u0645\u0631\u0627\u0647 ("+t.companion+")")}
                            </span>

                            <!-- User name -->
                            <span class="text-slate-400 text-[9px] font-medium whitespace-nowrap flex items-center gap-0.5">
                                <i class="fa-solid fa-user-check text-slate-300"></i>
                                ${escapeHTML(t.recordedBy||"\u0633\u06CC\u0633\u062A\u0645")}
                            </span>
                        </div>

                    </div>
                </div>
            `}),n+="</div>",l.innerHTML=n}else if(activeModalTab==="calls"){const s=window.contactLogs.filter(t=>t.patientId===e.id).sort((t,i)=>i.id.localeCompare(t.id));let n=`
            <div class="mb-6 bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 class="text-xs font-black text-slate-800 mb-3 border-b border-slate-200 pb-2 flex items-center gap-2">
                    <i class="fa-solid fa-phone-volume text-teal-600"></i> \u062B\u0628\u062A \u0646\u062A\u06CC\u062C\u0647 \u067E\u06CC\u06AF\u06CC\u0631\u06CC \u062A\u0644\u0641\u0646\u06CC \u062C\u062F\u06CC\u062F
                </h4>
                <form onsubmit="handleInlineCallSubmit(event)" class="text-[11px]">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
                        <div class="md:col-span-1">
                            <label class="block font-bold mb-1 text-slate-700">\u0646\u062A\u06CC\u062C\u0647 \u062A\u0645\u0627\u0633 <span class="text-red-500">*</span></label>
                            <select id="inline-call-result" required class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg outline-none focus:border-teal-brand focus:ring-2 focus:ring-teal-brand/20 bg-white font-semibold shadow-sm">
                                <option value="\u0641\u0639\u0627\u0644 \u0645\u06CC\u200C\u0628\u0627\u0634\u062F (\u062F\u0631 \u062D\u0627\u0644 \u0645\u0631\u0627\u062C\u0639\u0647 / \u062F\u0631 \u0631\u0627\u0647)">\u0641\u0639\u0627\u0644 \u0645\u06CC\u200C\u0628\u0627\u0634\u062F (\u062F\u0631 \u062D\u0627\u0644 \u0645\u0631\u0627\u062C\u0639\u0647 / \u062F\u0631 \u0631\u0627\u0647)</option>
                                <option value="\u0639\u062F\u0645 \u067E\u0627\u0633\u062E\u06AF\u0648\u06CC\u06CC (\u0646\u06CC\u0627\u0632 \u0628\u0647 \u062A\u0645\u0627\u0633 \u0645\u062C\u062F\u062F)">\u0639\u062F\u0645 \u067E\u0627\u0633\u062E\u06AF\u0648\u06CC\u06CC (\u0646\u06CC\u0627\u0632 \u0628\u0647 \u062A\u0645\u0627\u0633 \u0645\u062C\u062F\u062F)</option>
                                <option value="\u062E\u0627\u0631\u062C \u0627\u0632 \u062F\u0633\u062A\u0631\u0633 / \u062E\u0627\u0645\u0648\u0634">\u062E\u0627\u0631\u062C \u0627\u0632 \u062F\u0633\u062A\u0631\u0633 / \u062E\u0627\u0645\u0648\u0634</option>
                                <option value="\u0634\u0645\u0627\u0631\u0647 \u0648\u0627\u06AF\u0630\u0627\u0631 \u0634\u062F\u0647 / \u0627\u0634\u062A\u0628\u0627\u0647">\u0634\u0645\u0627\u0631\u0647 \u0648\u0627\u06AF\u0630\u0627\u0631 \u0634\u062F\u0647 / \u0627\u0634\u062A\u0628\u0627\u0647</option>
                                <option value="\u062A\u0631\u06A9 \u062F\u0631\u0645\u0627\u0646 (\u0627\u0646\u0635\u0631\u0627\u0641 \u0645\u0648\u0642\u062A/\u062F\u0627\u0626\u0645)">\u062A\u0631\u06A9 \u062F\u0631\u0645\u0627\u0646 (\u0627\u0646\u0635\u0631\u0627\u0641 \u0645\u0648\u0642\u062A/\u062F\u0627\u0626\u0645)</option>
                                <option value="\u0645\u0631\u0627\u062C\u0639\u0647 \u0628\u0647 \u0645\u0631\u06A9\u0632 \u062F\u06CC\u06AF\u0631 (\u0645\u0648\u0627\u0632\u06CC \u06A9\u0627\u0631\u06CC)">\u0645\u0631\u0627\u062C\u0639\u0647 \u0628\u0647 \u0645\u0631\u06A9\u0632 \u062F\u06CC\u06AF\u0631 (\u0645\u0648\u0627\u0632\u06CC \u06A9\u0627\u0631\u06CC)</option>
                                <option value="\u0628\u0633\u062A\u0631\u06CC \u062F\u0631 \u06A9\u0645\u067E / \u0632\u0646\u062F\u0627\u0646 / \u0628\u06CC\u0645\u0627\u0631\u0633\u062A\u0627\u0646">\u0628\u0633\u062A\u0631\u06CC \u062F\u0631 \u06A9\u0645\u067E / \u0632\u0646\u062F\u0627\u0646 / \u0628\u06CC\u0645\u0627\u0631\u0633\u062A\u0627\u0646</option>
                                <option value="\u0641\u0648\u062A">\u0641\u0648\u062A</option>
                                <option value="\u0633\u0627\u06CC\u0631 \u0645\u0648\u0627\u0631\u062F">\u0633\u0627\u06CC\u0631 \u0645\u0648\u0627\u0631\u062F</option>
                            </select>
                        </div>
                        <div class="md:col-span-1">
                            <label class="block font-bold mb-1 text-slate-700">\u0627\u0642\u062F\u0627\u0645 \u0628\u0639\u062F\u06CC / \u067E\u06CC\u06AF\u06CC\u0631\u06CC</label>
                            <input type="text" id="inline-call-next-action" class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg outline-none focus:border-teal-brand focus:ring-2 focus:ring-teal-brand/20 shadow-sm" placeholder="\u0645\u062B\u0627\u0644: \u062A\u0645\u0627\u0633 \u0645\u062C\u062F\u062F \u0641\u0631\u062F\u0627...">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block font-bold mb-1 text-slate-700">\u0634\u0631\u062D \u0645\u06A9\u0627\u0644\u0645\u0647 <span class="text-red-500">*</span></label>
                            <input type="text" id="inline-call-notes" required class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg outline-none focus:border-teal-brand focus:ring-2 focus:ring-teal-brand/20 shadow-sm" placeholder="\u062E\u0644\u0627\u0635\u0647 \u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0648 \u0628\u0647\u0627\u0646\u0647\u200C\u0647\u0627...">
                        </div>
                    </div>
                    <div class="flex justify-end mt-3">
                        <button type="submit" class="px-4 py-1.5 bg-teal-brand text-white rounded-lg font-bold hover:bg-teal-700 shadow transition flex items-center gap-1.5">
                            <i class="fa-solid fa-plus text-[10px]"></i> \u062B\u0628\u062A \u0644\u0627\u06AF \u062A\u0645\u0627\u0633
                        </button>
                    </div>
                </form>
            </div>
        `;s.length?(n+='<div class="space-y-4 relative border-r-2 border-teal-brand pr-4">',s.forEach(t=>{let i="bg-slate-100 text-slate-700 border-slate-200";t.result.includes("\u0641\u0639\u0627\u0644")?i="bg-emerald-50 text-emerald-700 border-emerald-200":t.result.includes("\u0639\u062F\u0645 \u067E\u0627\u0633\u062E")||t.result.includes("\u062E\u0627\u0645\u0648\u0634")?i="bg-amber-50 text-amber-700 border-amber-200":t.result.includes("\u0641\u0648\u062A")||t.result.includes("\u062A\u0631\u06A9 \u062F\u0631\u0645\u0627\u0646")||t.result.includes("\u0648\u0627\u06AF\u0630\u0627\u0631")?i="bg-rose-50 text-rose-700 border-rose-200":t.result.includes("\u0645\u0631\u06A9\u0632 \u062F\u06CC\u06AF\u0631")&&(i="bg-blue-50 text-blue-700 border-blue-200"),n+=`
                    <div class="relative">
                        <span class="absolute -right-[23px] top-1/2 -translate-y-1/2 bg-white text-teal-brand rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-bold border-2 border-teal-brand z-10"><i class="fa-solid fa-headset"></i></span>
                        <div class="bg-white border border-slate-200 p-3.5 rounded-xl shadow-sm hover:shadow transition space-y-2 text-xs">
                            <div class="flex justify-between items-start flex-wrap gap-2">
                                <div class="flex items-center gap-2">
                                    <span class="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-100 flex items-center gap-1 font-yekan">
                                        <i class="fa-regular fa-calendar text-[10px]"></i> ${toPersianDigits(t.date)}
                                    </span>
                                    <span class="px-2 py-0.5 rounded font-bold border text-[10px] ${i}">${escapeHTML(t.result)}</span>
                                </div>
                                <span class="text-slate-400 font-medium text-[10px] flex items-center gap-1"><i class="fa-regular fa-user"></i> ${escapeHTML(t.recordedBy)}</span>
                            </div>
                            <p class="text-slate-600 font-semibold text-justify leading-relaxed mt-1"><i class="fa-solid fa-quote-right text-slate-300 ml-1"></i> ${escapeHTML(t.notes)}</p>
                            ${t.nextAction?`<div class="bg-slate-50 border border-slate-100 p-2 rounded-lg text-[10px] font-bold text-slate-500 mt-2 flex items-center gap-1.5"><i class="fa-solid fa-thumbtack text-amber-500"></i> \u0627\u0642\u062F\u0627\u0645 \u0628\u0639\u062F\u06CC: ${escapeHTML(t.nextAction)}</div>`:""}
                        </div>
                    </div>
                `}),n+="</div>"):n+='<div class="p-6 text-center text-xs text-slate-400 italic font-bold border border-dashed border-slate-300 rounded-xl bg-slate-50/50">\u062A\u0627\u06A9\u0646\u0648\u0646 \u0647\u06CC\u0686\u06AF\u0648\u0646\u0647 \u062A\u0645\u0627\u0633 \u062A\u0644\u0641\u0646\u06CC \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0645\u0631\u0627\u062C\u0639 \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.</div>',l.innerHTML=n}else if(activeModalTab==="history"){const s=window.auditLogs.filter(t=>t.patientId===e.id).sort((t,i)=>(i.timestamp||0)-(t.timestamp||0));if(!s.length){l.innerHTML='<div class="p-8 text-center text-xs text-slate-400 italic font-bold border border-dashed border-slate-300 rounded-xl bg-slate-50/50">\u062A\u0627\u06A9\u0646\u0648\u0646 \u062A\u063A\u06CC\u06CC\u0631\u06CC \u062F\u0631 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u067E\u0627\u06CC\u0647 \u0627\u06CC\u0646 \u067E\u0631\u0648\u0646\u062F\u0647 \u062B\u0628\u062A \u0648 \u0636\u0628\u0637 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.</div>';return}let n=`
            <div class="mb-4">
                <h4 class="text-xs font-black text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <i class="fa-solid fa-clock-rotate-left text-teal-600"></i> \u062A\u0627\u0631\u06CC\u062E\u0686\u0647 \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u067E\u0631\u0648\u0646\u062F\u0647 (Audit Trail)
                </h4>
                <p class="text-[10px] text-slate-400 mt-1">\u062A\u0645\u0627\u0645 \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u0627\u06CC\u062C\u0627\u062F \u0634\u062F\u0647 \u062F\u0631 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u067E\u0627\u06CC\u0647 \u0628\u06CC\u0645\u0627\u0631 \u0628\u0647 \u0635\u0648\u0631\u062A \u062E\u0648\u062F\u06A9\u0627\u0631 \u062F\u0631 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u062B\u0628\u062A \u0645\u06CC\u200C\u06AF\u0631\u062F\u0646\u062F.</p>
            </div>
            <div class="overflow-x-auto custom-scrollbar border border-slate-200 rounded-xl">
                <table class="w-full text-right border-collapse">
                    <thead class="bg-slate-50 text-slate-600 text-[11px] font-bold border-b border-gray-200">
                        <tr>
                            <th class="p-3">\u0641\u06CC\u0644\u062F \u062A\u063A\u06CC\u06CC\u0631 \u062F\u0627\u062F\u0647 \u0634\u062F\u0647</th>
                            <th class="p-3">\u062A\u063A\u06CC\u06CC\u0631</th>
                            <th class="p-3">\u062A\u0627\u0631\u06CC\u062E \u0648 \u0633\u0627\u0639\u062A</th>
                        </tr>
                    </thead>
                    <tbody class="text-[11px] divide-y divide-gray-100 text-slate-700">
        `;s.forEach(t=>{n+=`
                <tr class="hover:bg-slate-50 transition">
                    <td class="p-3 font-bold text-teal-700 whitespace-nowrap"><i class="fa-solid fa-pen-clip text-slate-400 ml-1"></i>${escapeHTML(t.fieldName)}</td>
                    <td class="p-3">
                        <div class="flex items-center gap-2 text-[10px] font-semibold">
                            <span class="text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded line-through">${escapeHTML(t.oldValue)}</span>
                            <i class="fa-solid fa-arrow-left-long text-slate-300"></i>
                            <span class="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-black">${escapeHTML(t.newValue)}</span>
                        </div>
                    </td>
                    <td class="p-3 text-slate-400 font-yekan font-medium text-[10px] whitespace-nowrap">${toPersianDigits(t.date)} - ${toPersianDigits(t.time)}</td>
                </tr>
            `}),n+="</tbody></table></div>",l.innerHTML=n}else if(activeModalTab==="reviews"){const s=window.settings.chiefDoctorName||window.staff.doctors&&window.staff.doctors[0]||"\u062F\u06A9\u062A\u0631 \u062D\u0633\u0646\u200C\u067E\u0648\u0631";let n="";REVIEW_DEFICIENCY_OPTIONS.forEach((a,d)=>{n+=`<label class="flex items-center space-x-2 space-x-reverse cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition"><input type="checkbox" name="review-deficiency-item" value="${escapeHTML(a)}" onchange="updateDropdownLabel('reviewNewDeficiency')" class="rounded text-teal-brand w-4 h-4"> <span class="pr-2">${escapeHTML(a)}</span></label>`});let t=`
            <div class="mb-6 bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 class="text-xs font-black text-slate-800 mb-3 border-b border-slate-200 pb-2 flex items-center gap-2">
                    <i class="fa-solid fa-clipboard-check text-teal-600"></i> \u062B\u0628\u062A \u0628\u0631\u0631\u0633\u06CC \u062C\u062F\u06CC\u062F \u067E\u0631\u0648\u0646\u062F\u0647 (\u06A9\u0646\u062A\u0631\u0644 \u06A9\u06CC\u0641\u06CC\u062A)
                </h4>
                <form onsubmit="handleInlineReviewSubmit(event)" class="text-[11px] space-y-3">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label class="block font-bold mb-1 text-slate-700">\u062A\u0627\u0631\u06CC\u062E \u0628\u0631\u0631\u0633\u06CC</label>
                            <input type="text" disabled class="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 font-yekan font-bold text-center" value="${toPersianDigits(getShamsiToday())}">
                        </div>
                        <div>
                            <label class="block font-bold mb-1 text-slate-700">\u0628\u0631\u0631\u0633\u06CC\u200C\u06A9\u0646\u0646\u062F\u0647 (\u0645\u0633\u0626\u0648\u0644 \u0641\u0646\u06CC)</label>
                            <input type="text" disabled class="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 font-bold" value="${escapeHTML(s)}">
                        </div>
                        <div class="bg-white border border-slate-200 rounded-xl p-2 flex items-center">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" id="review-is-complete" onchange="toggleReviewDeficiencySection()" class="rounded text-emerald-600 w-4 h-4">
                                <span class="font-bold text-slate-700">\u067E\u0631\u0648\u0646\u062F\u0647 \u06A9\u0627\u0645\u0644 \u0627\u0633\u062A</span>
                            </label>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div id="review-deficiency-section" class="md:col-span-2">
                            <label class="block font-bold mb-1.5 text-slate-700">\u0645\u0648\u0627\u0631\u062F \u0646\u0642\u0635 <span class="text-red-500">*</span></label>
                            <div class="relative dropdown-container" id="dropdown-review-new-deficiency-container">
                                <button type="button" onclick="toggleDropdown('dropdown-review-new-deficiency-menu')" class="w-full flex justify-between items-center px-3 py-2 bg-white hover:bg-slate-50 border border-gray-300 rounded-xl text-[11px] font-bold text-slate-700 outline-none transition shadow-sm">
                                    <span id="dropdown-review-new-deficiency-label" class="text-slate-500 truncate max-w-[85%]">\u0627\u0646\u062A\u062E\u0627\u0628 \u0645\u0648\u0627\u0631\u062F \u0646\u0642\u0635...</span>
                                    <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 transition-transform duration-200" id="dropdown-review-new-deficiency-icon"></i>
                                </button>
                                <div id="dropdown-review-new-deficiency-menu" class="hidden min-w-[220px] absolute right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-30 p-2.5 max-h-52 overflow-y-auto custom-scrollbar space-y-1.5 animate-fade-in">
                                    ${n}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label class="block font-bold mb-1 text-slate-700">\u062A\u0648\u0636\u06CC\u062D\u0627\u062A</label>
                            <textarea id="review-notes" rows="1" class="w-full h-[38px] px-2.5 py-1.5 border border-slate-300 rounded-lg outline-none focus:border-teal-brand focus:ring-2 focus:ring-teal-brand/20 shadow-sm resize-none" placeholder="\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u062A\u06A9\u0645\u06CC\u0644\u06CC \u0645\u0633\u0626\u0648\u0644 \u0641\u0646\u06CC..."></textarea>
                        </div>
                    </div>

                    <div class="flex justify-end">
                        <button type="submit" class="px-4 py-1.5 bg-teal-brand text-white rounded-lg font-bold hover:bg-teal-700 shadow transition flex items-center gap-1.5">
                            <i class="fa-solid fa-plus text-[10px]"></i> \u062B\u0628\u062A \u0628\u0631\u0631\u0633\u06CC \u067E\u0631\u0648\u0646\u062F\u0647
                        </button>
                    </div>
                </form>
            </div>
        `;const i=window.patientReviews.filter(a=>a.patientId===e.id).sort((a,d)=>d.id.localeCompare(a.id));i.length?(t+=`
                <div class="overflow-x-auto custom-scrollbar border border-slate-200 rounded-xl">
                    <table class="w-full text-right border-collapse">
                        <thead class="bg-slate-50 text-slate-600 text-[11px] font-bold border-b border-gray-200">
                            <tr>
                                <th class="p-3">\u062A\u0627\u0631\u06CC\u062E</th>
                                <th class="p-3">\u0628\u0631\u0631\u0633\u06CC\u200C\u06A9\u0646\u0646\u062F\u0647</th>
                                <th class="p-3">\u0646\u062A\u06CC\u062C\u0647 \u0628\u0631\u0631\u0633\u06CC</th>
                                <th class="p-3">\u0645\u0648\u0627\u0631\u062F \u0646\u0642\u0635</th>
                                <th class="p-3">\u062A\u0648\u0636\u06CC\u062D\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody class="text-[11px] divide-y divide-gray-100 text-slate-700">
            `,i.forEach(a=>{t+=`
                    <tr class="hover:bg-slate-50 transition">
                        <td class="p-3 font-yekan font-bold text-teal-700 whitespace-nowrap">${toPersianDigits(a.date)}</td>
                        <td class="p-3">${escapeHTML(a.reviewer)}</td>
                        <td class="p-3">
                            ${a.isComplete?'<span class="px-2 py-0.5 rounded font-bold border text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">\u06A9\u0627\u0645\u0644</span>':'<span class="px-2 py-0.5 rounded font-bold border text-[10px] bg-rose-50 text-rose-700 border-rose-200">\u0646\u0627\u0642\u0635</span>'}
                        </td>
                        <td class="p-3">${a.deficiencies&&a.deficiencies.length?escapeHTML(a.deficiencies.join("\u060C ")):"-"}</td>
                        <td class="p-3 text-slate-500">${a.notes?escapeHTML(a.notes):"-"}</td>
                    </tr>
                `}),t+="</tbody></table></div>"):t+='<div class="p-6 text-center text-xs text-slate-400 italic font-bold border border-dashed border-slate-300 rounded-xl bg-slate-50/50">\u062A\u0627\u06A9\u0646\u0648\u0646 \u0647\u06CC\u0686 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646\u062A\u0631\u0644 \u06A9\u06CC\u0641\u06CC\u062A\u06CC \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u067E\u0631\u0648\u0646\u062F\u0647 \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.</div>',l.innerHTML=t}bindDigitConverters()}function toggleReviewDeficiencySection(){const l=document.getElementById("review-is-complete").checked,e=document.getElementById("review-deficiency-section");e&&(l?(e.classList.add("hidden"),document.querySelectorAll('#dropdown-review-new-deficiency-menu input[type="checkbox"]').forEach(s=>s.checked=!1),updateDropdownLabel("reviewNewDeficiency")):e.classList.remove("hidden"))}window.handleInlineReviewSubmit=function(l){l.preventDefault();const e=activePatientForModal;if(!e)return;const s=document.getElementById("review-is-complete").checked,n=[];if(document.querySelectorAll('#dropdown-review-new-deficiency-menu input[type="checkbox"]:checked').forEach(r=>{n.push(r.value)}),!s&&n.length===0){showCustomAlert("\u062E\u0637\u0627\u06CC \u0641\u0631\u0645","\u062F\u0631 \u0635\u0648\u0631\u062A \u0646\u0627\u0642\u0635 \u0628\u0648\u062F\u0646 \u067E\u0631\u0648\u0646\u062F\u0647\u060C \u0644\u0637\u0641\u0627\u064B \u062D\u062F\u0627\u0642\u0644 \u06CC\u06A9 \u0645\u0648\u0631\u062F \u0646\u0642\u0635 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F.");return}const t=window.settings.chiefDoctorName||window.staff.doctors&&window.staff.doctors[0]||"\u062F\u06A9\u062A\u0631 \u062D\u0633\u0646\u200C\u067E\u0648\u0631",i=getShamsiToday(),a=new Date().toLocaleTimeString("fa-IR",{hour:"2-digit",minute:"2-digit"}),d={id:crypto.randomUUID(),patientId:e.id,patientName:e.fullName||e.name+" "+e.lastname,date:i,reviewer:t,isComplete:s,deficiencies:s?[]:n,notes:document.getElementById("review-notes").value,recordedBy:t};window.patientReviews.unshift(d),dbPutRecord("patientReviews",d);const o={id:crypto.randomUUID(),timestamp:Date.now(),patientId:e.id,fieldName:"\u0628\u0631\u0631\u0633\u06CC \u067E\u0631\u0648\u0646\u062F\u0647",oldValue:"-",newValue:s?"\u0628\u0631\u0631\u0633\u06CC \u067E\u0631\u0648\u0646\u062F\u0647 \u0627\u0646\u062C\u0627\u0645 \u0634\u062F (\u06A9\u0627\u0645\u0644)":"\u0628\u0631\u0631\u0633\u06CC \u067E\u0631\u0648\u0646\u062F\u0647 \u0627\u0646\u062C\u0627\u0645 \u0634\u062F (\u0646\u0627\u0642\u0635)",date:i,time:a,recordedBy:t};window.auditLogs.unshift(o),dbPutRecord("auditLogs",o),triggerBackupReminder(),renderModalTabBody(),showToast("\u0628\u0631\u0631\u0633\u06CC \u067E\u0631\u0648\u0646\u062F\u0647 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062B\u0628\u062A \u0634\u062F.")},window.saveModalInlineChanges=function(l){l.preventDefault();const e=activePatientForModal;if(!e)return;const s=normalizeIdentifierValue(document.getElementById("m-p-nationalId").value);if(s){if(!validateIranianNationalId(s)){showCustomAlert("\u062E\u0637\u0627\u06CC \u0648\u0631\u0648\u062F \u0627\u0637\u0644\u0627\u0639\u0627\u062A","\u06A9\u062F \u0645\u0644\u06CC \u0648\u0627\u0631\u062F \u0634\u062F\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A!");return}if(window.patients.some(D=>D.nationalId===s&&D.id!==e.id)){showCustomAlert("\u062E\u0637\u0627\u06CC \u0648\u0631\u0648\u062F \u0627\u0637\u0644\u0627\u0639\u0627\u062A","\u06A9\u062F \u0645\u0644\u06CC \u062A\u06A9\u0631\u0627\u0631\u06CC \u0627\u0633\u062A \u0648 \u0628\u0647 \u0642\u0633\u0645\u062A \u0645\u062F\u06CC\u0631\u06CC\u062A \u0645\u0631\u0627\u062C\u0639\u06CC\u0646 \u0645\u0631\u0627\u062C\u0639\u0647 \u06A9\u0646\u06CC\u062F");return}}const n=e.insurance!==document.getElementById("m-p-insurance").value,t=[];document.querySelectorAll('input[name="m-p-med"]:checked').forEach(p=>{t.push(p.value)});const i=parseInt(document.getElementById("m-p-code").value);if(isNaN(i)){showCustomAlert("\u062E\u0637\u0627\u06CC \u0641\u0631\u0645","\u06A9\u062F \u067E\u0631\u0648\u0646\u062F\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A.");return}if(isPatientCodeTaken(i,e.id)){showCustomAlert("\u062E\u0637\u0627\u06CC \u0648\u06CC\u0631\u0627\u06CC\u0634 \u0633\u0631\u06CC\u0639","\u0627\u06CC\u0646 \u06A9\u062F \u067E\u0631\u0648\u0646\u062F\u0647 \u0642\u0628\u0644\u0627\u064B \u0628\u0631\u0627\u06CC \u0628\u06CC\u0645\u0627\u0631 \u062F\u06CC\u06AF\u0631\u06CC \u062B\u0628\u062A \u0634\u062F\u0647 \u0627\u0633\u062A. \u0644\u0637\u0641\u0627\u064B \u06A9\u062F \u067E\u0631\u0648\u0646\u062F\u0647 \u062F\u06CC\u06AF\u0631\u06CC \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F.");return}const a=document.getElementById("m-p-fullName").value,d=normalizeIdentifierValue(document.getElementById("m-p-phone").value),o=document.getElementById("m-p-status").value,r=document.getElementById("m-p-attendance").value,c=document.getElementById("m-p-insurance").value,u=document.getElementById("m-p-systemRegistered").value,f=document.getElementById("m-p-counselor").value,m=document.getElementById("m-p-drug").value,b=parseFloat(document.getElementById("m-p-dosage").value)||0,x=m==="\u0627\u067E\u06CC\u0648\u0645"&&document.getElementById("m-p-priority")?document.getElementById("m-p-priority").value:"",g=document.getElementById("m-p-initialDrug").value,y=parseFloat(document.getElementById("m-p-initialDosage").value)||0,h=g==="\u0627\u067E\u06CC\u0648\u0645"&&document.getElementById("m-p-initialPriority")?document.getElementById("m-p-initialPriority").value:"",v=document.getElementById("m-p-deactiveReason")?document.getElementById("m-p-deactiveReason").value:"",k=document.getElementById("m-p-deactiveNotes")?document.getElementById("m-p-deactiveNotes").value:"";if(o==="\u063A\u06CC\u0631\u0641\u0639\u0627\u0644"&&!v){showCustomAlert("\u062E\u0637\u0627\u06CC \u0641\u0631\u0645","\u0644\u0637\u0641\u0627\u064B \u0639\u0644\u062A \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0634\u062F\u0646 \u067E\u0631\u0648\u0646\u062F\u0647 \u0631\u0627 \u062A\u0639\u06CC\u06CC\u0646 \u06A9\u0646\u06CC\u062F!");return}const w=e.fullName||e.name+" "+e.lastname;if(e.code!==i&&logChange(e.id,"\u06A9\u062F \u067E\u0631\u0648\u0646\u062F\u0647",e.code,i),w!==a&&logChange(e.id,"\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC",w,a),e.phone!==d&&logChange(e.id,"\u0634\u0645\u0627\u0631\u0647 \u062A\u0645\u0627\u0633 \u0645\u0631\u0627\u062C\u0639",e.phone,d),e.status!==o&&logChange(e.id,"\u0648\u0636\u0639\u06CC\u062A \u067E\u0631\u0648\u0646\u062F\u0647",e.status,o),e.attendance!==r&&logChange(e.id,"\u0646\u0638\u0645 \u062D\u0636\u0648\u0631",e.attendance,r),e.insurance!==c&&logChange(e.id,"\u0648\u0636\u0639\u06CC\u062A \u0628\u06CC\u0645\u0647",e.insurance,c),(e.systemRegistered||"\u062E\u06CC\u0631")!==u&&logChange(e.id,"\u062B\u0628\u062A \u062F\u0631 \u0633\u0627\u0645\u0627\u0646\u0647",e.systemRegistered||"\u062E\u06CC\u0631",u),e.counselor!==f&&logChange(e.id,"\u0645\u0634\u0627\u0648\u0631 (\u0631\u0648\u0627\u0646\u0634\u0646\u0627\u0633)",e.counselor||"-",f||"-"),e.currentDrug!==m&&logChange(e.id,"\u062F\u0631\u0645\u0627\u0646 \u062F\u0627\u0631\u0648\u06CC\u06CC \u0641\u0639\u0644\u06CC",e.currentDrug,m),e.currentDosage!==b&&logChange(e.id,"\u062F\u0648\u0632 \u062A\u062C\u0648\u06CC\u0632\u06CC \u0641\u0639\u0644\u06CC",e.currentDosage,b),(e.currentPriority||"")!==x&&logChange(e.id,"\u0627\u0648\u0644\u0648\u06CC\u062A \u0627\u067E\u06CC\u0648\u0645",e.currentPriority||"-",x||"-"),e.initialDrug!==g&&logChange(e.id,"\u067E\u0631\u0648\u062A\u06A9\u0644 \u062F\u0627\u0631\u0648\u06CC\u06CC \u0627\u0648\u0644\u06CC\u0647",e.initialDrug,g),e.initialDosage!==y&&logChange(e.id,"\u062F\u0648\u0632 \u062F\u0627\u0631\u0648\u06CC\u06CC \u0627\u0648\u0644\u06CC\u0647",e.initialDosage,y),(e.initialPriority||"")!==h&&logChange(e.id,"\u0627\u0648\u0644\u0648\u06CC\u062A \u0627\u067E\u06CC\u0648\u0645 (\u0627\u0648\u0644\u06CC\u0647)",e.initialPriority||"-",h||"-"),e.deactiveReason!==v&&logChange(e.id,"\u0639\u0644\u062A \u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC",e.deactiveReason||"-",v||"-"),e.code=i,e.fullName=a,e.nationalId=s,e.birthdate=document.getElementById("m-p-birthdate").value,e.age=parseInt(document.getElementById("m-p-age").value),e.phone=d,e.admissionDate=document.getElementById("m-p-admissionDate").value,e.marital=document.getElementById("m-p-marital").value,e.employment=document.getElementById("m-p-employment").value,e.job=document.getElementById("m-p-job").value,e.attempts=document.getElementById("m-p-attempts").value,e.counselor=f,e.substance=document.getElementById("m-p-substance").value,e.startAge=parseInt(document.getElementById("m-p-startAge").value)||0,e.duration=parseInt(document.getElementById("m-p-duration").value)||0,e.currentDrug=m,e.currentDosage=b,e.currentPriority=x,e.initialDrug=g,e.initialDosage=y,e.initialPriority=h,e.status=o,e.attendance=o==="\u063A\u06CC\u0631\u0641\u0639\u0627\u0644"?"\u063A\u06CC\u0628\u062A":r,e.insurance=c,e.systemRegistered=u,e.medHistory=t,e.medicalNotes=document.getElementById("m-p-medicalNotes").value,e.deactiveReason=o==="\u063A\u06CC\u0631\u0641\u0639\u0627\u0644"?v:"",e.deactiveNotes=o==="\u063A\u06CC\u0631\u0641\u0639\u0627\u0644"?k:"",n){const p={id:crypto.randomUUID(),patientId:e.id,insuranceStatus:c,date:new Date().toLocaleDateString("fa-IR"),recordedBy:"\u062F\u06A9\u062A\u0631 \u062D\u0633\u0646\u200C\u067E\u0648\u0631"};window.insuranceHistory.unshift(p),dbPutRecord("insuranceHistory",p)}const $=window.patients.findIndex(p=>p.id===e.id);if($>-1&&(window.patients[$]=e),dbPutRecord("patients",e),typeof opSyncMemberPriorityFromPatient=="function")try{opSyncMemberPriorityFromPatient(e.id,x)}catch{}if(triggerBackupReminder(),toggleModalInlineEdit(!1),renderPatientsList(),renderDashboard(),renderVisitsList(),typeof renderOpiumPage=="function"&&document.getElementById("tab-opium")&&!document.getElementById("tab-opium").classList.contains("hidden"))try{renderOpiumPage()}catch{}showToast("\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0645\u0631\u0627\u062C\u0639 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u0628\u0647 \u0635\u0648\u0631\u062A \u062F\u0631\u062C\u0627 \u0648 \u0633\u0631\u06CC\u0639 \u0628\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F.")};
