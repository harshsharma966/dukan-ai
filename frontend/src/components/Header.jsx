import React from 'react';

export default function Header({
  activeTab,
  onTabChange,
  lang,
  onToggleLang,
  t,
  currentShop,
  currentRole = 'owner',
  staffName = '',
  onOpenStaffModal,
  onOpenAuth,
  onLogout
}) {
  const isCashier = currentRole === 'cashier';

  return (
    <header className="bg-white border-b border-[#E7E5E4] sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
        {/* TOP ROW: Shop Info & Action Controls */}
        <div className="flex items-center justify-between gap-2 pb-2">
          {/* Shop Brand & Title */}
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 text-white rounded-xl flex items-center justify-center text-sm sm:text-xl shadow-xs flex-shrink-0 ${
              isCashier ? 'bg-blue-600' : 'bg-[#15803D]'
            }`}>
              <i className={`fa-solid ${isCashier ? 'fa-user-tag' : 'fa-shop'}`}></i>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="font-extrabold text-sm sm:text-lg text-[#1C1917] leading-tight truncate max-w-[140px] sm:max-w-none">
                  {currentShop ? currentShop.shop_name : t.app_title}
                </h1>
                {isCashier ? (
                  <span className="bg-blue-100 text-blue-800 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded border border-blue-200">
                    बिल बॉय {staffName ? `(${staffName})` : ''}
                  </span>
                ) : (
                  <span className="bg-[#FEF3C7] text-[#B45309] text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-[#FDE68A] flex items-center gap-0.5">
                    <i className="fa-solid fa-bolt text-[#F59E0B]"></i>
                    <span className="hidden sm:inline">{t.app_badge}</span>
                  </span>
                )}
              </div>
              <p className="text-[10px] sm:text-xs text-[#78716C] truncate max-w-[180px] sm:max-w-none">
                {currentShop
                  ? `${currentShop.owner_name} • 📞 ${currentShop.mobile}${currentShop.address ? ` • 📍 ${currentShop.address}` : ''}`
                  : t.app_subtitle}
              </p>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {!isCashier && (
              <button
                onClick={onOpenStaffModal}
                title={lang === 'hi' ? 'कर्मचारी जोड़ें / देखें' : 'Manage Staff'}
                className="text-[10px] sm:text-[11px] text-purple-700 hover:text-purple-900 font-bold bg-purple-50 hover:bg-purple-100 px-2 sm:px-2.5 py-1 rounded-lg border border-purple-200 transition flex items-center gap-1"
              >
                <i className="fa-solid fa-users text-xs"></i>
                <span className="hidden sm:inline">{lang === 'hi' ? 'कर्मचारी' : 'Staff'}</span>
              </button>
            )}

            <button
              onClick={onOpenAuth}
              title={lang === 'hi' ? 'दुकान बदलें' : 'Switch Shop'}
              className="text-[10px] sm:text-[11px] text-emerald-700 hover:text-emerald-900 font-bold bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-lg border border-emerald-200 transition flex items-center gap-1"
            >
              <i className="fa-solid fa-arrows-rotate text-xs"></i>
              <span className="hidden md:inline">{lang === 'hi' ? 'दुकान बदलें' : 'Switch'}</span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              title="Change Language"
              className="text-[10px] sm:text-[11px] font-bold bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] px-2 py-1 rounded-lg transition"
            >
              {lang === 'hi' ? 'EN' : 'हिन्दी'}
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              title={lang === 'hi' ? 'लॉगआउट' : 'Logout'}
              className="text-[10px] sm:text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-lg border border-red-200 transition font-bold flex items-center gap-1"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span className="hidden sm:inline">{lang === 'hi' ? 'लॉगआउट' : 'Logout'}</span>
            </button>
          </div>
        </div>

        {/* BOTTOM ROW: Smooth Scrolling Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto whitespace-nowrap pt-1 text-xs sm:text-sm font-medium border-t border-[#F5F5F4] -mx-2 px-2 sm:mx-0 sm:px-0">
          <button
            onClick={() => onTabChange('billing')}
            className={`px-3 py-1.5 sm:py-2 rounded-lg flex items-center gap-1.5 transition flex-shrink-0 ${
              activeTab === 'billing' 
                ? 'bg-[#15803D] text-white font-bold shadow-xs' 
                : 'text-[#78716C] hover:text-[#15803D] hover:bg-stone-50'
            }`}
          >
            <i className="fa-solid fa-cash-register text-xs sm:text-sm"></i> 
            <span>{t.tab_billing}</span>
          </button>

          {!isCashier && (
            <button
              onClick={() => onTabChange('purchase')}
              className={`px-3 py-1.5 sm:py-2 rounded-lg flex items-center gap-1.5 transition flex-shrink-0 ${
                activeTab === 'purchase' 
                  ? 'bg-[#15803D] text-white font-bold shadow-xs' 
                  : 'text-[#78716C] hover:text-[#15803D] hover:bg-stone-50'
              }`}
            >
              <i className="fa-solid fa-boxes-stacked text-xs sm:text-sm"></i> 
              <span>{t.tab_purchase}</span>
            </button>
          )}

          {!isCashier && (
            <button
              onClick={() => onTabChange('khata')}
              className={`px-3 py-1.5 sm:py-2 rounded-lg flex items-center gap-1.5 transition flex-shrink-0 ${
                activeTab === 'khata' 
                  ? 'bg-[#15803D] text-white font-bold shadow-xs' 
                  : 'text-[#78716C] hover:text-[#15803D] hover:bg-stone-50'
              }`}
            >
              <i className="fa-solid fa-book-bookmark text-xs sm:text-sm"></i> 
              <span>{t.tab_khata}</span>
            </button>
          )}

          <button
            onClick={() => onTabChange('history')}
            className={`px-3 py-1.5 sm:py-2 rounded-lg flex items-center gap-1.5 transition flex-shrink-0 ${
              activeTab === 'history' 
                ? 'bg-[#15803D] text-white font-bold shadow-xs' 
                : 'text-[#78716C] hover:text-[#15803D] hover:bg-stone-50'
            }`}
          >
            <i className="fa-solid fa-receipt text-xs sm:text-sm"></i> 
            <span>{t.tab_history}</span>
          </button>

          {!isCashier && (
            <button
              onClick={() => onTabChange('report')}
              className={`px-3 py-1.5 sm:py-2 rounded-lg flex items-center gap-1.5 transition flex-shrink-0 ${
                activeTab === 'report' 
                  ? 'bg-[#15803D] text-white font-bold shadow-xs' 
                  : 'text-[#78716C] hover:text-[#15803D] hover:bg-stone-50'
              }`}
            >
              <i className="fa-solid fa-chart-line text-xs sm:text-sm"></i> 
              <span>{t.tab_report}</span>
            </button>
          )}

          {/* Direct DB Tables link */}
          <a
            href="http://127.0.0.1:8000/tables"
            target="_blank"
            rel="noopener noreferrer"
            title="View Raw Database"
            className="px-2.5 py-1.5 rounded-lg text-[#166534] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-bold flex items-center gap-1 ml-auto flex-shrink-0 hidden sm:flex"
          >
            <i className="fa-solid fa-database text-[10px]"></i>
            <span>DB</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
