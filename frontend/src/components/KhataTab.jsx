import React, { useState, useEffect } from 'react';
import { sendUdhaarWhatsAppReminder } from '../utils';

export default function KhataTab({
  onOpenNewCustomerModal,
  onOpenSettleModal,
  onOpenStatementModal,
  lang,
  t,
  currentShop
}) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/customers');
      const data = await res.json();
      if (data.success) {
        setCustomers(data.customers || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <section className="tab-view block space-y-3 sm:space-y-4">
      <div className="bg-white p-3 sm:p-5 rounded-2xl border border-[#E7E5E4] shadow-xs">
        {/* Header Bar */}
        <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-3 border-b border-[#E7E5E4] pb-3 sm:pb-4 mb-3 sm:mb-4">
          <div>
            <h2 className="font-extrabold text-[#1C1917] text-sm sm:text-base">{t.khata_title}</h2>
            <p className="text-[11px] sm:text-xs text-[#78716C]">{t.khata_sub}</p>
          </div>
          <button
            onClick={onOpenNewCustomerModal}
            className="bg-[#15803D] hover:bg-[#166534] text-white text-xs px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-bold transition shadow-xs flex items-center gap-1.5 active:scale-95"
          >
            <i className="fa-solid fa-user-plus text-xs"></i>
            <span>{t.btn_new_customer}</span>
          </button>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="text-center py-8 text-xs text-[#78716C]">
            ⏳ Loading...
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center py-8 text-xs text-[#A8A29E]">
            {t.no_customers}
          </div>
        ) : (
          <>
            {/* MOBILE CARD VIEW (Visible only on <640px) */}
            <div className="sm:hidden space-y-2.5">
              {customers.map((c) => {
                const due = parseFloat(c.current_due) || 0;
                return (
                  <div
                    key={c.id}
                    className="p-3 rounded-xl border border-[#E7E5E4] bg-[#FAFAF7] space-y-2.5"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-[#1C1917] text-sm">{c.name}</h4>
                        <p className="text-[11px] text-[#78716C] font-mono">
                          📞 {c.mobile || '-'}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#78716C] block uppercase font-bold">{t.th_current_due}</span>
                        <span
                          className={`font-black text-sm font-mono ${
                            due > 0 ? 'text-red-600' : 'text-[#15803D]'
                          }`}
                        >
                          ₹{due.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[#E7E5E4]/80">
                      <button
                        onClick={() => onOpenStatementModal(c.id)}
                        className="flex-1 py-1.5 bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                      >
                        <i className="fa-solid fa-file-invoice text-xs"></i>
                        <span>{t.btn_monthly_stmt}</span>
                      </button>

                      {due > 0 ? (
                        <>
                          <button
                            onClick={() =>
                              sendUdhaarWhatsAppReminder(
                                c.name,
                                c.mobile,
                                due,
                                lang,
                                t.prompt_enter_mobile,
                                currentShop
                              )
                            }
                            title="WhatsApp Udhaar Reminder"
                            className="py-1.5 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 shadow-2xs"
                          >
                            <i className="fa-brands fa-whatsapp text-sm"></i>
                          </button>
                          <button
                            onClick={() => onOpenSettleModal(c)}
                            className="flex-1 py-1.5 bg-[#15803D] hover:bg-[#166534] text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 shadow-2xs"
                          >
                            <i className="fa-solid fa-hand-holding-dollar text-xs"></i>
                            <span>{t.btn_settle_due}</span>
                          </button>
                        </>
                      ) : (
                        <div className="flex-1 text-center py-1.5 text-[#15803D] font-bold text-xs bg-[#DCFCE7]/60 rounded-lg border border-[#BBF7D0]">
                          ✓ {t.no_due}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DESKTOP TABLE VIEW (Visible on >=640px) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFAF7] text-[#78716C] border-b border-[#E7E5E4] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">{t.th_cust_name}</th>
                    <th className="py-2.5 px-3">{t.th_mobile}</th>
                    <th className="py-2.5 px-3">{t.th_current_due}</th>
                    <th className="py-2.5 px-3 text-right">{t.th_action}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E5E4]">
                  {customers.map((c) => {
                    const due = parseFloat(c.current_due) || 0;
                    return (
                      <tr key={c.id} className="hover:bg-[#FAFAF7] transition">
                        <td className="py-2.5 px-3 font-bold text-[#1C1917]">{c.name}</td>
                        <td className="py-2.5 px-3 text-[#78716C] font-mono">{c.mobile || '-'}</td>
                        <td
                          className={`py-2.5 px-3 font-extrabold font-mono ${
                            due > 0 ? 'text-red-600' : 'text-[#15803D]'
                          }`}
                        >
                          ₹{due.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => onOpenStatementModal(c.id)}
                            className="bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] px-2.5 py-1 rounded-lg text-xs font-bold mr-1.5 transition"
                          >
                            <i className="fa-solid fa-file-invoice"></i> {t.btn_monthly_stmt}
                          </button>
                          {due > 0 ? (
                            <>
                              <button
                                onClick={() =>
                                  sendUdhaarWhatsAppReminder(
                                    c.name,
                                    c.mobile,
                                    due,
                                    lang,
                                    t.prompt_enter_mobile,
                                    currentShop
                                  )
                                }
                                title="WhatsApp Udhaar Reminder"
                                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-2.5 py-1 rounded-lg text-xs font-bold mr-1.5 transition inline-flex items-center gap-1 shadow-xs"
                              >
                                <i className="fa-brands fa-whatsapp text-sm"></i>{' '}
                                <span>{t.btn_udhaar_reminder}</span>
                              </button>
                              <button
                                onClick={() => onOpenSettleModal(c)}
                                className="bg-[#15803D] hover:bg-[#166534] text-white px-3 py-1 rounded-lg text-xs font-bold transition"
                              >
                                {t.btn_settle_due}
                              </button>
                            </>
                          ) : (
                            <span className="text-[#A8A29E] text-[11px] font-medium">
                              {t.no_due}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
