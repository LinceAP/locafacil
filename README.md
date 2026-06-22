<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>LocaFácil</title>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

:root {
  --black:   #0F0F0F;
  --black2:  #1C1C1E;
  --black3:  #2C2C2E;
  --gray1:   #3A3A3C;
  --gray2:   #636366;
  --gray3:   #AEAEB2;
  --gray4:   #E5E5EA;
  --gray5:   #F2F2F7;
  --white:   #FFFFFF;
  --orange:  #FF6B00;
  --orange2: #FF8C38;
  --orange-bg: #FFF3EA;
  --green:   #34C759;
  --green-bg:#E8F8ED;
  --red:     #FF3B30;
  --red-bg:  #FFEEED;
  --yellow:  #FF9500;
  --yellow-bg:#FFF5E6;
  --surface: #FFFFFF;
  --bg:      #F2F2F7;
  --text:    #0F0F0F;
  --text2:   #636366;
  --text3:   #AEAEB2;
  --border:  #F2F2F7;
  --input-bg:#F2F2F7;
}

@media (prefers-color-scheme: dark) {
  :root {
    --surface: #1C1C1E;
    --bg:      #000000;
    --text:    #F2F2F7;
    --text2:   #AEAEB2;
    --text3:   #636366;
    --border:  #3A3A3C;
    --input-bg:#2C2C2E;
    --orange-bg:#2D1A00;
    --green-bg: #0D2E1A;
    --red-bg:   #2D0D0B;
    --yellow-bg:#2D1F00;
    --gray5:    #2C2C2E;
    --gray4:    #3A3A3C;
    --gray3:    #636366;
    --gray2:    #AEAEB2;
    --black3:   #3A3A3C;
    --black2:   #1C1C1E;
  }
}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

body {
  font-family:'Inter',-apple-system,sans-serif;
  background:var(--bg);
  color:var(--text);
  min-height:100vh;
  -webkit-font-smoothing:antialiased;
}

/* ── LOADING OVERLAY ── */
#loading-overlay {
  position:fixed;inset:0;
  background:var(--bg);
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  z-index:999;gap:16px;
}
.spinner {
  width:36px;height:36px;
  border:3px solid var(--border);
  border-top-color:var(--orange);
  border-radius:50%;
  animation:spin .7s linear infinite;
}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-text{font-size:14px;font-weight:600;color:var(--text2);}

/* ── LOGIN ── */
#login-screen {
  min-height:100vh;
  background:#000;
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:32px 24px;
}
.login-brand{display:flex;flex-direction:column;align-items:center;margin-bottom:48px;}
.login-icon-wrap{width:80px;height:80px;background:var(--orange);border-radius:22px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;}
.login-wordmark{font-size:32px;font-weight:900;letter-spacing:-1.5px;color:#fff;}
.login-wordmark span{color:var(--orange);}
.login-tagline{font-size:13px;color:#636366;margin-top:6px;}
.login-card{width:100%;max-width:360px;background:#1C1C1E;border-radius:20px;padding:28px 24px;border:1px solid #2C2C2E;}
.input-group{margin-bottom:14px;}
.input-label{font-size:11px;font-weight:700;color:#AEAEB2;text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px;display:flex;align-items:center;gap:6px;}
.flat-input{width:100%;background:#2C2C2E;border:1.5px solid transparent;border-radius:12px;padding:14px 16px;font-size:16px;font-family:'Inter',sans-serif;color:#fff;outline:none;transition:border-color .15s;}
.flat-input::placeholder{color:#636366;}
.flat-input:focus{border-color:var(--orange);}
.btn-login{width:100%;background:var(--orange);color:#fff;border:none;border-radius:12px;padding:16px;font-size:16px;font-weight:700;font-family:'Inter',sans-serif;cursor:pointer;margin-top:6px;transition:background .15s;}
.btn-login:hover{background:var(--orange2);}
.login-hint{font-size:12px;color:#636366;text-align:center;margin-top:16px;}
.login-hint b{color:#AEAEB2;}
.login-error{background:#2D0D0B;color:#FF3B30;border-radius:10px;padding:10px 14px;font-size:13px;font-weight:600;margin-bottom:14px;display:none;}

/* ── APP ── */
#app{display:none;flex-direction:column;min-height:100vh;padding-bottom:80px;}

.app-header{background:#000;padding:16px 20px 14px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;}
.header-brand{display:flex;align-items:center;gap:10px;}
.header-logo-box{width:34px;height:34px;background:var(--orange);border-radius:9px;display:flex;align-items:center;justify-content:center;}
.header-wordmark{font-size:19px;font-weight:900;letter-spacing:-.8px;color:#fff;}
.header-wordmark span{color:var(--orange);}
.header-right{display:flex;align-items:center;gap:10px;}
.header-date{font-size:12px;color:#AEAEB2;font-weight:500;}
.btn-ghost{background:#2C2C2E;border:none;color:#AEAEB2;padding:7px 13px;border-radius:8px;font-size:12px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;display:flex;align-items:center;gap:5px;transition:color .15s;}
.btn-ghost:hover{color:#fff;}

/* sync indicator */
.sync-dot{width:8px;height:8px;border-radius:50%;background:#34C759;flex-shrink:0;}
.sync-dot.syncing{background:var(--orange);animation:pulse 1s ease-in-out infinite;}
.sync-dot.error{background:var(--red);}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}

.bottom-nav{position:fixed;bottom:0;left:0;right:0;background:#000;border-top:1px solid #2C2C2E;display:flex;z-index:100;padding-bottom:env(safe-area-inset-bottom,0);}
.nav-item{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:10px 4px 12px;cursor:pointer;gap:4px;border:none;background:transparent;font-family:'Inter',sans-serif;}
.nav-icon{color:#636366;transition:color .15s;}
.nav-label{font-size:10px;font-weight:600;color:#636366;letter-spacing:.2px;transition:color .15s;}
.nav-item.active .nav-icon,.nav-item.active .nav-label{color:var(--orange);}

.main-content{padding:20px 16px;max-width:640px;margin:0 auto;width:100%;}

.sec-header{margin-bottom:20px;}
.sec-title{font-size:26px;font-weight:900;letter-spacing:-1px;color:var(--text);}
.sec-sub{font-size:14px;color:var(--text2);margin-top:3px;font-weight:500;}

.card{background:var(--surface);border-radius:16px;overflow:hidden;margin-bottom:14px;}
.card-header{padding:16px 18px 0;display:flex;align-items:center;justify-content:space-between;}
.card-title{font-size:13px;font-weight:700;color:var(--text2);text-transform:uppercase;letter-spacing:.6px;display:flex;align-items:center;gap:6px;}

.stat-row{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:14px;}
.stat-tile{background:var(--surface);border-radius:16px;padding:18px 16px;display:flex;flex-direction:column;gap:10px;}
.stat-icon-wrap{width:40px;height:40px;border-radius:11px;display:flex;align-items:center;justify-content:center;}
.stat-num{font-size:32px;font-weight:900;letter-spacing:-1.5px;line-height:1;color:var(--text);}
.stat-label{font-size:12px;font-weight:600;color:var(--text2);margin-top:2px;}

.list-item{display:flex;align-items:center;gap:14px;padding:14px 18px;border-bottom:1px solid var(--border);}
.list-item:last-child{border-bottom:none;}
.list-item-icon{width:40px;height:40px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.list-item-body{flex:1;min-width:0;}
.list-item-name{font-size:15px;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.list-item-meta{font-size:12px;color:var(--text2);margin-top:2px;font-weight:500;}
.list-item-right{text-align:right;flex-shrink:0;}
.list-item-val{font-size:20px;font-weight:900;letter-spacing:-.5px;}
.list-item-sub{font-size:11px;color:var(--text3);font-weight:500;}

.badge{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.2px;}
.badge-orange{background:var(--orange-bg);color:var(--orange);}
.badge-green{background:var(--green-bg);color:var(--green);}
.badge-red{background:var(--red-bg);color:var(--red);}
.badge-yellow{background:var(--yellow-bg);color:var(--yellow);}
.badge-gray{background:var(--input-bg);color:var(--text2);}

.aluguel-card{background:var(--surface);border-radius:16px;margin-bottom:12px;overflow:hidden;}
.aluguel-top{display:flex;align-items:flex-start;justify-content:space-between;padding:16px 18px 12px;border-bottom:1px solid var(--border);}
.aluguel-nome{font-size:17px;font-weight:800;letter-spacing:-.3px;color:var(--text);}
.aluguel-info{font-size:12px;color:var(--text2);margin-top:4px;font-weight:500;line-height:1.6;}
.aluguel-itens-wrap{padding:12px 18px;display:flex;flex-wrap:wrap;gap:6px;border-bottom:1px solid var(--border);}
.item-chip{background:var(--input-bg);border-radius:8px;padding:5px 10px;font-size:12px;font-weight:600;color:var(--text);}
.aluguel-obs{padding:10px 18px;font-size:12px;color:var(--text2);border-bottom:1px solid var(--border);font-weight:500;}
.aluguel-actions{display:flex;}
.action-btn{flex:1;padding:13px 8px;border:none;font-size:13px;font-weight:700;font-family:'Inter',sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;border-right:1px solid var(--border);background:var(--surface);color:var(--text2);transition:background .12s;}
.action-btn:last-child{border-right:none;}
.action-btn:hover{background:var(--input-bg);}
.action-btn.primary{color:var(--orange);}
.action-btn.success{color:var(--green);}
.action-btn.danger{color:var(--red);}

.disponib-row{display:flex;align-items:center;padding:13px 18px;border-bottom:1px solid var(--border);gap:12px;}
.disponib-row:last-child{border-bottom:none;}
.disponib-name{flex:1;font-size:14px;font-weight:600;color:var(--text);}
.avail-bar-wrap{width:60px;height:6px;background:var(--gray4);border-radius:3px;overflow:hidden;}
.avail-bar{height:100%;border-radius:3px;transition:width .3s;}

.form-card{background:var(--surface);border-radius:16px;overflow:hidden;margin-bottom:14px;}
.form-section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--text2);padding:16px 18px 6px;}
.form-field{padding:0 18px 14px;}
.form-label{font-size:12px;font-weight:600;color:var(--text2);margin-bottom:7px;display:block;}
.form-input{width:100%;background:var(--input-bg);border:1.5px solid transparent;border-radius:10px;padding:12px 14px;font-size:15px;font-family:'Inter',sans-serif;color:var(--text);outline:none;transition:border-color .15s;-webkit-appearance:none;}
.form-input:focus{border-color:var(--orange);background:var(--surface);}
.form-input::placeholder{color:var(--text3);}
select.form-input{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23636366' stroke-width='1.5' stroke-linecap='round' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:36px;}
textarea.form-input{resize:vertical;min-height:72px;}
.form-2col{display:grid;grid-template-columns:1fr 1fr;gap:10px;}

.qty-row{display:flex;align-items:center;padding:12px 18px;border-bottom:1px solid var(--border);gap:12px;}
.qty-row:last-child{border-bottom:none;}
.qty-item-name{flex:1;font-size:14px;font-weight:600;color:var(--text);}
.qty-item-stock{font-size:11px;color:var(--text3);}
.qty-ctrl{display:flex;align-items:center;gap:12px;}
.qty-btn{width:32px;height:32px;border-radius:50%;border:none;font-size:18px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .12s;font-family:'Inter',sans-serif;}
.qty-btn-minus{background:var(--input-bg);color:var(--text);}
.qty-btn-minus:hover{background:var(--red-bg);color:var(--red);}
.qty-btn-plus{background:var(--orange);color:#fff;}
.qty-btn-plus:hover{background:var(--orange2);}
.qty-val{font-size:17px;font-weight:800;width:24px;text-align:center;color:var(--text);}

.btn-primary{width:100%;background:var(--orange);color:#fff;border:none;border-radius:12px;padding:15px;font-size:16px;font-weight:700;font-family:'Inter',sans-serif;cursor:pointer;transition:background .15s;display:flex;align-items:center;justify-content:center;gap:8px;}
.btn-primary:hover{background:var(--orange2);}
.btn-primary:disabled{opacity:.5;cursor:not-allowed;}

.btn-secondary{width:100%;background:var(--input-bg);color:var(--text);border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:700;font-family:'Inter',sans-serif;cursor:pointer;transition:background .15s;display:flex;align-items:center;justify-content:center;gap:8px;}
.btn-secondary:hover{background:var(--gray4);}

.fab{position:fixed;bottom:88px;right:20px;background:var(--orange);color:#fff;border:none;border-radius:28px;padding:14px 22px;font-size:15px;font-weight:800;font-family:'Inter',sans-serif;cursor:pointer;box-shadow:0 8px 28px rgba(255,107,0,.45);display:flex;align-items:center;gap:8px;z-index:80;transition:transform .15s,box-shadow .15s;}
.fab:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(255,107,0,.5);}

.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:200;display:flex;align-items:flex-end;justify-content:center;backdrop-filter:blur(3px);}
.modal-sheet{background:var(--surface);border-radius:22px 22px 0 0;width:100%;max-width:560px;max-height:92vh;overflow-y:auto;position:relative;}
.modal-handle{width:36px;height:4px;background:var(--border);border-radius:2px;margin:12px auto 0;}
.modal-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px 4px;}
.modal-title{font-size:20px;font-weight:900;letter-spacing:-.5px;color:var(--text);}
.modal-close{width:30px;height:30px;border-radius:50%;background:var(--input-bg);border:none;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text2);font-weight:700;}
.modal-body{padding:16px 0 32px;}

.estoque-edit-item{display:flex;align-items:center;padding:12px 18px;border-bottom:1px solid var(--border);gap:12px;}
.estoque-edit-item:last-child{border-bottom:none;}
.estoque-edit-name{flex:1;font-size:14px;font-weight:600;color:var(--text);}
.estoque-edit-meta{font-size:12px;color:var(--text2);}
.btn-icon{width:32px;height:32px;border-radius:8px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:background .12s;}
.btn-icon-edit{background:var(--orange-bg);color:var(--orange);}
.btn-icon-del{background:var(--red-bg);color:var(--red);}
.btn-icon-edit:hover{background:var(--orange);color:#fff;}
.btn-icon-del:hover{background:var(--red);color:#fff;}

.empty{text-align:center;padding:40px 20px;}
.empty-icon{font-size:44px;margin-bottom:12px;}
.empty-title{font-size:16px;font-weight:700;color:var(--text);}
.empty-text{font-size:14px;color:var(--text2);}

.toast{position:fixed;bottom:100px;left:50%;transform:translateX(-50%) translateY(8px);background:#000;color:#fff;padding:11px 22px;border-radius:20px;font-size:13px;font-weight:600;z-index:999;opacity:0;transition:opacity .2s,transform .2s;pointer-events:none;white-space:nowrap;box-shadow:0 4px 20px rgba(0,0,0,.3);}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0);}

.hidden{display:none!important;}

@media(min-width:600px){
  .stat-row{grid-template-columns:repeat(4,1fr);}
  .modal-overlay{align-items:center;padding:24px;}
  .modal-sheet{border-radius:22px;max-height:88vh;}
}
@supports(padding-bottom:env(safe-area-inset-bottom)){
  #app{padding-bottom:calc(80px + env(safe-area-inset-bottom));}
}
</style>
</head>
<body>

<!-- LOADING -->
<div id="loading-overlay">
  <div class="spinner"></div>
  <div class="loading-text">Carregando...</div>
</div>

<!-- LOGIN -->
<div id="login-screen" style="display:none">
  <div class="login-brand">
    <div class="login-icon-wrap">
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
        <path d="M21 10L33 17V31L21 38L9 31V17L21 10Z" stroke="white" stroke-width="2.5" fill="none"/>
        <circle cx="21" cy="21" r="5" fill="white"/>
      </svg>
    </div>
    <div class="login-wordmark">Loca<span>Fácil</span></div>
    <div class="login-tagline">Gestão de aluguéis na nuvem</div>
  </div>
  <div class="login-card">
    <div class="login-error" id="login-error">Usuário ou senha incorretos</div>
    <div class="input-group">
      <div class="input-label">Usuário</div>
      <input type="text" class="flat-input" id="login-user" placeholder="admin" autocomplete="username"/>
    </div>
    <div class="input-group">
      <div class="input-label">Senha</div>
      <input type="password" class="flat-input" id="login-pass" placeholder="••••••" autocomplete="current-password"/>
    </div>
    <button class="btn-login" onclick="doLogin()">Entrar</button>
    <div class="login-hint">Acesso padrão: <b>admin</b> / <b>1234</b></div>
  </div>
</div>

<!-- APP -->
<div id="app">
  <div class="app-header">
    <div class="header-brand">
      <div class="header-logo-box">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L18 6.5V13.5L10 18L2 13.5V6.5L10 2Z" stroke="white" stroke-width="1.5" fill="none"/>
          <circle cx="10" cy="10" r="2.5" fill="white"/>
        </svg>
      </div>
      <div class="header-wordmark">Loca<span>Fácil</span></div>
    </div>
    <div class="header-right">
      <div class="sync-dot" id="sync-dot" title="Sincronizado"></div>
      <div class="header-date" id="header-date">—</div>
      <button class="btn-ghost" onclick="doLogout()">
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M5 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3M9 10l3-3-3-3M13 7H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Sair
      </button>
    </div>
  </div>

  <div class="main-content">
    <!-- PAINEL -->
    <div id="tab-painel">
      <div class="sec-header">
        <div class="sec-title" id="painel-greeting">Bom dia!</div>
        <div class="sec-sub" id="painel-date">—</div>
      </div>
      <div class="stat-row">
        <div class="stat-tile">
          <div class="stat-icon-wrap" style="background:var(--orange-bg)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="12" rx="2" stroke="#FF6B00" stroke-width="1.5"/><path d="M6 5V4a2 2 0 0 1 4 0v1M10 5V4a2 2 0 0 1 4 0v1" stroke="#FF6B00" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
          <div><div class="stat-num" id="stat-ativos">—</div><div class="stat-label">Em campo</div></div>
        </div>
        <div class="stat-tile">
          <div class="stat-icon-wrap" style="background:#EBF5FF">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 10l7 7 7-7M10 3v14" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div><div class="stat-num" id="stat-saem" style="color:#007AFF">—</div><div class="stat-label">Saem hoje</div></div>
        </div>
        <div class="stat-tile">
          <div class="stat-icon-wrap" style="background:var(--green-bg)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17 10l-7-7-7 7M10 17V3" stroke="#34C759" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div><div class="stat-num" id="stat-voltam" style="color:var(--green)">—</div><div class="stat-label">Voltam hoje</div></div>
        </div>
        <div class="stat-tile">
          <div class="stat-icon-wrap" style="background:var(--red-bg)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="#FF3B30" stroke-width="1.5"/><path d="M10 7v4M10 13v.5" stroke="#FF3B30" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
          <div><div class="stat-num" id="stat-atrasados" style="color:var(--red)">—</div><div class="stat-label">Atrasados</div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">📤 Saem Hoje</div></div>
        <div id="painel-saem"></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">📥 Recolher Hoje</div></div>
        <div id="painel-voltam"></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title" style="color:var(--red)">⚠️ Recolhimento Atrasado</div></div>
        <div id="painel-atrasados"></div>
      </div>
    </div>

    <!-- ESTOQUE -->
    <div id="tab-estoque" class="hidden">
      <div class="sec-header"><div class="sec-title">Estoque</div><div class="sec-sub">Disponível agora</div></div>
      <div class="card"><div id="estoque-list"></div></div>
      <button class="btn-secondary" onclick="openModalEstoque()">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        Adicionar / Editar Item
      </button>
    </div>

    <!-- ALUGUÉIS -->
    <div id="tab-alugueis" class="hidden">
      <div class="sec-header"><div class="sec-title">Aluguéis</div><div class="sec-sub">Ativos e agendados</div></div>
      <div id="alugueis-list"></div>
    </div>

    <!-- DISPONIBILIDADE -->
    <div id="tab-disponib" class="hidden">
      <div class="sec-header"><div class="sec-title">Disponibilidade</div><div class="sec-sub">Veja o que está livre numa data</div></div>
      <div class="form-card">
        <div class="form-section-title">Escolha a data do evento</div>
        <div class="form-field"><input type="date" class="form-input" id="disponib-data" oninput="calcDisponib()"/></div>
      </div>
      <div id="disponib-result"></div>
    </div>

    <!-- HISTÓRICO -->
    <div id="tab-historico" class="hidden">
      <div class="sec-header"><div class="sec-title">Histórico</div><div class="sec-sub">Aluguéis finalizados</div></div>
      <div id="historico-list"></div>
    </div>
  </div>

  <button class="fab" onclick="openModalAluguel()">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
    Novo Aluguel
  </button>

  <nav class="bottom-nav">
    <button class="nav-item active" onclick="showTab('painel',this)">
      <svg class="nav-icon" width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="2" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.6"/><rect x="12" y="2" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.6"/><rect x="2" y="12" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.6"/><rect x="12" y="12" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.6"/></svg>
      <span class="nav-label">Painel</span>
    </button>
    <button class="nav-item" onclick="showTab('estoque',this)">
      <svg class="nav-icon" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 8l8-5 8 5v9l-8 4-8-4V8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M11 3v14M3 8l8 5 8-5" stroke="currentColor" stroke-width="1.6"/></svg>
      <span class="nav-label">Estoque</span>
    </button>
    <button class="nav-item" onclick="showTab('alugueis',this)">
      <svg class="nav-icon" width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="4" width="16" height="15" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M7 2v4M15 2v4M3 9h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      <span class="nav-label">Aluguéis</span>
    </button>
    <button class="nav-item" onclick="showTab('disponib',this)">
      <svg class="nav-icon" width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.6"/><path d="M19 19l-3-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      <span class="nav-label">Consultar</span>
    </button>
    <button class="nav-item" onclick="showTab('historico',this)">
      <svg class="nav-icon" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 5h16M3 9h10M3 13h12M3 17h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      <span class="nav-label">Histórico</span>
    </button>
  </nav>
</div>

<!-- MODAL ALUGUEL -->
<div class="modal-overlay hidden" id="modal-aluguel" onclick="overlayClose(event,'modal-aluguel')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <div class="modal-header">
      <div class="modal-title">Novo Aluguel</div>
      <button class="modal-close" onclick="closeModal('modal-aluguel')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-card">
        <div class="form-section-title">Cliente</div>
        <div class="form-field"><label class="form-label">Nome *</label><input type="text" class="form-input" id="m-cliente" placeholder="Ex: Maria Silva"/></div>
        <div class="form-field"><label class="form-label">Telefone</label><input type="tel" class="form-input" id="m-fone" placeholder="(96) 99999-9999"/></div>
        <div class="form-field"><label class="form-label">Endereço do evento</label><input type="text" class="form-input" id="m-endereco" placeholder="Rua, número, bairro..."/></div>
      </div>
      <div class="form-card">
        <div class="form-section-title">Período</div>
        <div class="form-field">
          <div class="form-2col">
            <div><label class="form-label">Entrega</label><input type="date" class="form-input" id="m-entrega"/></div>
            <div><label class="form-label">Recolhimento</label><input type="date" class="form-input" id="m-recolhimento"/></div>
          </div>
        </div>
      </div>
      <div class="form-card">
        <div class="form-section-title">Itens do Aluguel</div>
        <div id="modal-itens-list"></div>
      </div>
      <div class="form-card">
        <div class="form-section-title">Observações</div>
        <div class="form-field"><textarea class="form-input" id="m-obs" placeholder="Cor de toalha, horário específico..."></textarea></div>
      </div>
      <div style="padding:0 16px;">
        <button class="btn-primary" id="btn-salvar-aluguel" onclick="salvarAluguel()">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4.5 4.5L14 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Salvar Aluguel
        </button>
      </div>
    </div>
  </div>
</div>

<!-- MODAL ESTOQUE -->
<div class="modal-overlay hidden" id="modal-estoque" onclick="overlayClose(event,'modal-estoque')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <div class="modal-header">
      <div class="modal-title">Gerenciar Estoque</div>
      <button class="modal-close" onclick="closeModal('modal-estoque')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-card">
        <div class="form-section-title" id="estoque-form-title">Novo Item</div>
        <div class="form-field"><label class="form-label">Nome do item</label><input type="text" class="form-input" id="e-nome" placeholder="Ex: Cadeira plástica"/></div>
        <div class="form-field">
          <div class="form-2col">
            <div><label class="form-label">Quantidade</label><input type="number" class="form-input" id="e-qtd" placeholder="0" min="0"/></div>
            <div><label class="form-label">Unidade</label><select class="form-input" id="e-unidade"><option>unidade</option><option>jogo</option><option>conjunto</option><option>metro</option><option>par</option></select></div>
          </div>
        </div>
        <div class="form-field">
          <button class="btn-primary" id="btn-salvar-item" onclick="salvarItem()">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>
            <span id="btn-salvar-item-label">Adicionar Item</span>
          </button>
        </div>
      </div>
      <div class="form-card">
        <div class="form-section-title">Itens Cadastrados</div>
        <div id="estoque-edit-list"></div>
      </div>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
/* ════════════════════════════════════
   SUPABASE
════════════════════════════════════ */
const SUPA_URL = 'https://bdjkuyfmzllciwowjcdx.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkamt1eWZtemxsY2l3b3dqY2R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNTU0NTQsImV4cCI6MjA5NzczMTQ1NH0.yqPKM5-AympsDbWlEsW7z5ShXyrsoq-XogSd5UsvLNA';
const sb = supabase.createClient(SUPA_URL, SUPA_KEY);

/* ════════════════════════════════════
   ESTADO LOCAL (cache)
════════════════════════════════════ */
const USERS = { admin:'1234', operador:'4321' };
let estoque  = [];
let alugueis = [];

/* ════════════════════════════════════
   SYNC DOT
════════════════════════════════════ */
function setSyncState(state) {
  const dot = document.getElementById('sync-dot');
  dot.className = 'sync-dot' + (state === 'syncing' ? ' syncing' : state === 'error' ? ' error' : '');
  dot.title = state === 'syncing' ? 'Sincronizando...' : state === 'error' ? 'Erro de conexão' : 'Sincronizado';
}

/* ════════════════════════════════════
   INICIALIZAÇÃO
════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', async () => {
  // tenta verificar se já tem sessão salva
  const savedUser = localStorage.getItem('lf_user');
  if (savedUser) {
    await bootApp();
  } else {
    document.getElementById('loading-overlay').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
  }
});

let autoRefreshTimer = null;

async function silentRefresh() {
  try {
    await loadAllData();
    // re-render only the currently visible tab
    const tabs = ['painel','estoque','alugueis','disponib','historico'];
    for (const t of tabs) {
      const el = document.getElementById('tab-' + t);
      if (el && !el.classList.contains('hidden')) {
        const renders = { painel:renderPainel, estoque:renderEstoque, alugueis:renderAlugueis, historico:renderHistorico };
        if (renders[t]) renders[t]();
        break;
      }
    }
    // always keep painel stats fresh
    renderPainel();
  } catch(e) { setSyncState('error'); }
}

async function bootApp() {
  document.getElementById('loading-overlay').style.display = 'flex';
  try {
    await loadAllData();
    document.getElementById('loading-overlay').style.display = 'none';
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    setDate();
    renderAll();
    setSyncState('ok');
    // auto-refresh every 30 seconds
    clearInterval(autoRefreshTimer);
    autoRefreshTimer = setInterval(silentRefresh, 30000);
    // also refresh when user comes back to the tab/app
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') silentRefresh();
    }, { once: false });
  } catch(e) {
    document.getElementById('loading-overlay').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
    showToast('Erro ao conectar. Verifique a internet.');
  }
}

async function loadAllData() {
  setSyncState('syncing');
  const [resE, resA] = await Promise.all([
    sb.from('estoque').select('*').order('id'),
    sb.from('alugueis').select('*').order('entrega')
  ]);
  if (resE.error) throw resE.error;
  if (resA.error) throw resA.error;
  estoque  = resE.data || [];
  alugueis = resA.data || [];
  setSyncState('ok');
}

/* ════════════════════════════════════
   AUTH
════════════════════════════════════ */
async function doLogin() {
  const u = document.getElementById('login-user').value.trim();
  const p = document.getElementById('login-pass').value;
  const errEl = document.getElementById('login-error');
  errEl.style.display = 'none';

  if (!USERS[u] || USERS[u] !== p) {
    errEl.style.display = 'block';
    return;
  }

  localStorage.setItem('lf_user', u);
  await bootApp();
}

function doLogout() {
  localStorage.removeItem('lf_user'); clearInterval(autoRefreshTimer);
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('login-user').value = '';
  document.getElementById('login-pass').value = '';
}

document.getElementById('login-user').addEventListener('keydown', e => { if(e.key==='Enter') document.getElementById('login-pass').focus(); });
document.getElementById('login-pass').addEventListener('keydown', e => { if(e.key==='Enter') doLogin(); });

/* ════════════════════════════════════
   TABS
════════════════════════════════════ */
function showTab(tab, btn) {
  ['painel','estoque','alugueis','disponib','historico'].forEach(t =>
    document.getElementById('tab-'+t).classList.add('hidden'));
  document.getElementById('tab-'+tab).classList.remove('hidden');
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  if (btn) btn.classList.add('active');
  // sempre busca dados frescos ao trocar de aba
  silentRefresh();
}

function renderAll() {
  renderPainel(); renderEstoque(); renderAlugueis(); renderHistorico();
}

/* ════════════════════════════════════
   UTILS
════════════════════════════════════ */
function today() { return new Date().toISOString().slice(0,10); }

function fmt(s) {
  if (!s) return '—';
  const [y,m,d] = s.slice(0,10).split('-');
  return `${d}/${m}/${y}`;
}

function setDate() {
  const now  = new Date();
  const dias  = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
  const meses = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  const h = now.getHours();
  document.getElementById('painel-greeting').textContent = (h<12?'Bom dia! 👋':h<18?'Boa tarde! 👋':'Boa noite! 👋');
  document.getElementById('painel-date').textContent = `${dias[now.getDay()]}, ${now.getDate()} de ${meses[now.getMonth()]}`;
  document.getElementById('header-date').textContent = `${now.getDate()}/${now.getMonth()+1}`;
}

/* ════════════════════════════════════
   PAINEL
════════════════════════════════════ */
function renderPainel() {
  const hoje = today();
  const ativos     = alugueis.filter(a => a.status === 'ativo');
  const saemHoje   = alugueis.filter(a => a.entrega?.slice(0,10) === hoje && a.status !== 'finalizado');
  const voltamHoje = alugueis.filter(a => a.recolhimento?.slice(0,10) === hoje && a.status === 'ativo');
  const atrasados  = alugueis.filter(a => a.recolhimento?.slice(0,10) < hoje && a.status === 'ativo');

  document.getElementById('stat-ativos').textContent    = ativos.length;
  document.getElementById('stat-saem').textContent      = saemHoje.length;
  document.getElementById('stat-voltam').textContent    = voltamHoje.length;
  document.getElementById('stat-atrasados').textContent = atrasados.length;

  renderPainelList('painel-saem', saemHoje, 'saem');
  renderPainelList('painel-voltam', voltamHoje, 'volta');
  renderPainelList('painel-atrasados', atrasados, 'atrasado');
}

function renderPainelList(id, list, tipo) {
  const el = document.getElementById(id);
  if (!list.length) { el.innerHTML=`<div class="empty" style="padding:18px 0"><div class="empty-text">Nenhum</div></div>`; return; }
  const labelDate = a => tipo==='saem'?`Entregar em ${fmt(a.entrega)}`:tipo==='volta'?`Recolher em ${fmt(a.recolhimento)}`:`Venceu em ${fmt(a.recolhimento)}`;
  el.innerHTML = list.map(a => `
    <div class="list-item">
      <div class="list-item-icon" style="background:${tipo==='atrasado'?'var(--red-bg)':tipo==='volta'?'var(--green-bg)':'var(--orange-bg)'}">
        <span style="font-size:16px">${tipo==='saem'?'📤':tipo==='volta'?'📥':'⚠️'}</span>
      </div>
      <div class="list-item-body">
        <div class="list-item-name">${a.cliente}</div>
        <div class="list-item-meta">${labelDate(a)}${a.endereco?' · '+a.endereco:''}</div>
      </div>
    </div>`).join('');
}

/* ════════════════════════════════════
   ESTOQUE
════════════════════════════════════ */
function calcEmCampo(itemId, dataInicio, dataFim) {
  return alugueis
    .filter(a => a.status==='ativo' && a.entrega?.slice(0,10)<=dataFim && a.recolhimento?.slice(0,10)>=dataInicio)
    .reduce((acc,a) => {
      const it = (a.itens||[]).find(x=>x.id===itemId);
      return acc + (it?it.qty:0);
    }, 0);
}

function renderEstoque() {
  const hoje = today();
  const el   = document.getElementById('estoque-list');
  if (!estoque.length) { el.innerHTML=`<div class="empty"><div class="empty-icon">📦</div><div class="empty-title">Nenhum item</div><div class="empty-text">Adicione itens ao estoque</div></div>`; return; }
  el.innerHTML = estoque.map(item => {
    const campo = calcEmCampo(item.id, hoje, hoje);
    const disp  = item.qtd - campo;
    const pct   = item.qtd>0 ? disp/item.qtd : 1;
    const color = pct<=0.2?'var(--red)':pct<=0.5?'var(--yellow)':'var(--green)';
    const barC  = pct<=0.2?'#FF3B30':pct<=0.5?'#FF9500':'#34C759';
    return `<div class="list-item">
      <div class="list-item-icon" style="background:var(--input-bg)">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="6" width="14" height="10" rx="2" stroke="#636366" stroke-width="1.4"/><path d="M5 6V5a4 4 0 0 1 8 0v1" stroke="#636366" stroke-width="1.4" stroke-linecap="round"/></svg>
      </div>
      <div class="list-item-body">
        <div class="list-item-name">${item.nome}</div>
        <div class="list-item-meta">${campo} em campo · ${item.qtd} total · ${item.unidade}</div>
        <div class="avail-bar-wrap" style="margin-top:6px"><div class="avail-bar" style="width:${Math.max(4,pct*100)}%;background:${barC}"></div></div>
      </div>
      <div class="list-item-right">
        <div class="list-item-val" style="color:${color}">${disp}</div>
        <div class="list-item-sub">livre${disp!==1?'s':''}</div>
      </div>
    </div>`;
  }).join('');
}

/* ════════════════════════════════════
   ALUGUÉIS
════════════════════════════════════ */
function renderAlugueis() {
  const el   = document.getElementById('alugueis-list');
  const hoje = today();
  const list = alugueis.filter(a=>a.status!=='finalizado').sort((a,b)=>a.entrega?.localeCompare(b.entrega));
  if (!list.length) { el.innerHTML=`<div class="empty"><div class="empty-icon">📋</div><div class="empty-title">Sem aluguéis ativos</div><div class="empty-text">Toque em "Novo Aluguel" para começar</div></div>`; return; }

  el.innerHTML = list.map(a => {
    const atrasado = a.status==='ativo' && a.recolhimento?.slice(0,10) < hoje;
    const badge = a.status==='agendado'
      ? `<span class="badge badge-yellow">Agendado</span>`
      : atrasado ? `<span class="badge badge-red">Atrasado</span>`
      : `<span class="badge badge-green">Em campo</span>`;

    const chips = (a.itens||[]).filter(i=>i.qty>0).map(i=>{
      const est=estoque.find(e=>e.id===i.id);
      return est?`<span class="item-chip">${est.nome} · ${i.qty}</span>`:'';
    }).join('');

    const btnSaiu  = a.status==='agendado' ? `<button class="action-btn primary" onclick="marcarSaiu(${a.id})">📤 Confirmar Saída</button>` : '';
    const btnVoltou= a.status==='ativo'    ? `<button class="action-btn success" onclick="marcarVoltou(${a.id})">📥 Voltou Tudo</button>` : '';

    return `<div class="aluguel-card">
      <div class="aluguel-top">
        <div>
          <div class="aluguel-nome">${a.cliente}</div>
          <div class="aluguel-info">
            📤 Entrega: ${fmt(a.entrega)}<br>
            📥 Recolhimento: ${fmt(a.recolhimento)}
            ${a.endereco?`<br>📍 ${a.endereco}`:''}
            ${a.fone?`<br>📱 ${a.fone}`:''}
          </div>
        </div>
        ${badge}
      </div>
      ${chips?`<div class="aluguel-itens-wrap">${chips}</div>`:''}
      ${a.obs?`<div class="aluguel-obs">💬 ${a.obs}</div>`:''}
      <div class="aluguel-actions">
        ${btnSaiu}${btnVoltou}
        <button class="action-btn danger" onclick="excluirAluguel(${a.id})">🗑 Excluir</button>
      </div>
    </div>`;
  }).join('');
}

async function marcarSaiu(id) {
  setSyncState('syncing');
  const {error} = await sb.from('alugueis').update({status:'ativo'}).eq('id',id);
  if (error) { setSyncState('error'); showToast('Erro ao atualizar'); return; }
  await loadAllData();
  renderAlugueis(); renderPainel(); renderEstoque();
  showToast('✅ Saída confirmada');
}

async function marcarVoltou(id) {
  setSyncState('syncing');
  const {error} = await sb.from('alugueis').update({status:'finalizado', voltou:today()}).eq('id',id);
  if (error) { setSyncState('error'); showToast('Erro ao atualizar'); return; }
  await loadAllData();
  renderAll();
  showToast('✅ Recolhimento registrado');
}

async function excluirAluguel(id) {
  if (!confirm('Excluir este aluguel?')) return;
  setSyncState('syncing');
  const {error} = await sb.from('alugueis').delete().eq('id',id);
  if (error) { setSyncState('error'); showToast('Erro ao excluir'); return; }
  await loadAllData();
  renderAlugueis(); renderPainel(); renderEstoque();
  showToast('Aluguel removido');
}

/* ════════════════════════════════════
   HISTÓRICO
════════════════════════════════════ */
function renderHistorico() {
  const el  = document.getElementById('historico-list');
  const fin = alugueis.filter(a=>a.status==='finalizado').sort((a,b)=>(b.voltou||'').localeCompare(a.voltou||''));
  if (!fin.length) { el.innerHTML=`<div class="empty"><div class="empty-icon">📁</div><div class="empty-title">Nenhum finalizado</div><div class="empty-text">Os aluguéis concluídos aparecem aqui</div></div>`; return; }
  el.innerHTML = fin.map(a => {
    const chips=(a.itens||[]).filter(i=>i.qty>0).map(i=>{const est=estoque.find(e=>e.id===i.id);return est?`<span class="item-chip">${est.nome} · ${i.qty}</span>`:''}).join('');
    return `<div class="aluguel-card" style="opacity:.8">
      <div class="aluguel-top">
        <div>
          <div class="aluguel-nome">${a.cliente}</div>
          <div class="aluguel-info">📤 ${fmt(a.entrega)} → 📥 ${fmt(a.recolhimento)}<br>✅ Voltou: ${fmt(a.voltou)}</div>
        </div>
        <span class="badge badge-gray">Finalizado</span>
      </div>
      ${chips?`<div class="aluguel-itens-wrap">${chips}</div>`:''}
    </div>`;
  }).join('');
}

/* ════════════════════════════════════
   DISPONIBILIDADE
════════════════════════════════════ */
function calcDisponib() {
  const data = document.getElementById('disponib-data').value;
  const el   = document.getElementById('disponib-result');
  if (!data) { el.innerHTML=''; return; }
  const rows = estoque.map(item => {
    const campo = calcEmCampo(item.id, data, data);
    const disp  = item.qtd - campo;
    const pct   = item.qtd>0 ? disp/item.qtd : 1;
    const badge = pct<=0 ? `<span class="badge badge-red">Indisponível</span>`
                : pct<0.3 ? `<span class="badge badge-yellow">${disp} livre${disp!==1?'s':''}</span>`
                :            `<span class="badge badge-green">${disp} livre${disp!==1?'s':''}</span>`;
    const barC = pct<=0.2?'#FF3B30':pct<=0.5?'#FF9500':'#34C759';
    return `<div class="disponib-row">
      <div class="disponib-name">${item.nome}</div>
      <div class="avail-bar-wrap"><div class="avail-bar" style="width:${Math.max(4,pct*100)}%;background:${barC}"></div></div>
      ${badge}
    </div>`;
  }).join('');
  el.innerHTML = `<div class="card">${rows}</div>`;
}

/* ════════════════════════════════════
   MODAL ALUGUEL
════════════════════════════════════ */
let selecionados = {};

function openModalAluguel() {
  selecionados = {};
  ['m-cliente','m-fone','m-endereco','m-obs'].forEach(id => document.getElementById(id).value='');
  document.getElementById('m-entrega').value = today();
  document.getElementById('m-recolhimento').value = today();
  renderModalItens();
  openModal('modal-aluguel');
}

function renderModalItens() {
  document.getElementById('modal-itens-list').innerHTML = estoque.map(item => `
    <div class="qty-row">
      <div>
        <div class="qty-item-name">${item.nome}</div>
        <div class="qty-item-stock">${item.qtd} no estoque</div>
      </div>
      <div class="qty-ctrl">
        <button class="qty-btn qty-btn-minus" onclick="chQty(${item.id},-1)">−</button>
        <div class="qty-val" id="qty-${item.id}">0</div>
        <button class="qty-btn qty-btn-plus" onclick="chQty(${item.id},+1)">+</button>
      </div>
    </div>`).join('');
}

function chQty(id, delta) {
  const cur = selecionados[id]||0;
  const item = estoque.find(e=>e.id===id);
  selecionados[id] = Math.max(0, Math.min(cur+delta, item.qtd));
  document.getElementById('qty-'+id).textContent = selecionados[id];
}

async function salvarAluguel() {
  const cliente  = document.getElementById('m-cliente').value.trim();
  const entrega  = document.getElementById('m-entrega').value;
  const recolh   = document.getElementById('m-recolhimento').value;
  if (!cliente) { showToast('Informe o nome do cliente'); return; }
  if (!entrega||!recolh) { showToast('Informe as datas'); return; }

  const itens  = Object.entries(selecionados).map(([id,qty])=>({id:parseInt(id),qty})).filter(i=>i.qty>0);
  const status = entrega <= today() ? 'ativo' : 'agendado';
  const payload = {
    cliente,
    fone:     document.getElementById('m-fone').value.trim()||null,
    endereco: document.getElementById('m-endereco').value.trim()||null,
    obs:      document.getElementById('m-obs').value.trim()||null,
    entrega, recolhimento:recolh, itens, status
  };

  const btn = document.getElementById('btn-salvar-aluguel');
  btn.disabled = true;
  setSyncState('syncing');

  const {error} = await sb.from('alugueis').insert(payload);
  btn.disabled = false;

  if (error) { setSyncState('error'); showToast('Erro ao salvar. Tente novamente.'); return; }
  await loadAllData();
  closeModal('modal-aluguel');
  renderAlugueis(); renderPainel(); renderEstoque();
  showToast('✅ Aluguel salvo!');
}

/* ════════════════════════════════════
   MODAL ESTOQUE
════════════════════════════════════ */
let editandoId = null;

function openModalEstoque() {
  editandoId = null;
  document.getElementById('e-nome').value = '';
  document.getElementById('e-qtd').value  = '';
  document.getElementById('estoque-form-title').textContent = 'Novo Item';
  document.getElementById('btn-salvar-item-label').textContent = 'Adicionar Item';
  renderEstoqueEditList();
  openModal('modal-estoque');
}

function renderEstoqueEditList() {
  const el = document.getElementById('estoque-edit-list');
  if (!estoque.length) { el.innerHTML=`<div class="empty" style="padding:20px"><div class="empty-text">Nenhum item cadastrado</div></div>`; return; }
  el.innerHTML = estoque.map(item => `
    <div class="estoque-edit-item">
      <div><div class="estoque-edit-name">${item.nome}</div><div class="estoque-edit-meta">${item.qtd} ${item.unidade}</div></div>
      <div style="display:flex;gap:6px">
        <button class="btn-icon btn-icon-edit" onclick="editarItem(${item.id})">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9.5 2.5l2 2-8 8H1.5v-2l8-8z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
        </button>
        <button class="btn-icon btn-icon-del" onclick="deletarItem(${item.id})">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 3.5h10M5.5 3.5V2.5h3v1M11 3.5l-.6 8a1 1 0 0 1-1 .9H4.6a1 1 0 0 1-1-.9L3 3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>`).join('');
}

function editarItem(id) {
  const item = estoque.find(e=>e.id===id);
  if (!item) return;
  editandoId = id;
  document.getElementById('e-nome').value = item.nome;
  document.getElementById('e-qtd').value  = item.qtd;
  document.getElementById('e-unidade').value = item.unidade;
  document.getElementById('estoque-form-title').textContent = 'Editar Item';
  document.getElementById('btn-salvar-item-label').textContent = 'Salvar Alterações';
  document.getElementById('e-nome').scrollIntoView({behavior:'smooth',block:'center'});
  document.getElementById('e-nome').focus();
}

async function deletarItem(id) {
  if (!confirm('Remover este item do estoque?')) return;
  setSyncState('syncing');
  const {error} = await sb.from('estoque').delete().eq('id',id);
  if (error) { setSyncState('error'); showToast('Erro ao remover'); return; }
  await loadAllData();
  renderEstoqueEditList(); renderEstoque();
  showToast('Item removido');
}

async function salvarItem() {
  const nome    = document.getElementById('e-nome').value.trim();
  const qtd     = parseInt(document.getElementById('e-qtd').value);
  const unidade = document.getElementById('e-unidade').value;
  if (!nome||isNaN(qtd)||qtd<0) { showToast('Preencha nome e quantidade'); return; }

  const btn = document.getElementById('btn-salvar-item');
  btn.disabled = true;
  setSyncState('syncing');

  let error;
  if (editandoId) {
    ({error} = await sb.from('estoque').update({nome,qtd,unidade}).eq('id',editandoId));
  } else {
    ({error} = await sb.from('estoque').insert({nome,qtd,unidade}));
  }

  btn.disabled = false;
  if (error) { setSyncState('error'); showToast('Erro ao salvar item'); return; }

  await loadAllData();
  editandoId = null;
  document.getElementById('e-nome').value = '';
  document.getElementById('e-qtd').value  = '';
  document.getElementById('estoque-form-title').textContent = 'Novo Item';
  document.getElementById('btn-salvar-item-label').textContent = 'Adicionar Item';
  renderEstoqueEditList(); renderEstoque();
  showToast('✅ Item salvo!');
}

/* ════════════════════════════════════
   MODAL UTILS
════════════════════════════════════ */
function openModal(id)  { document.getElementById(id).classList.remove('hidden'); document.body.style.overflow='hidden'; }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); document.body.style.overflow=''; }
function overlayClose(e,id) { if(e.target.id===id) closeModal(id); }

/* ════════════════════════════════════
   TOAST
════════════════════════════════════ */
let toastTimer;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>el.classList.remove('show'), 2600);
}
</script>

<!-- SQL para rodar no Supabase SQL Editor (só uma vez):
CREATE TABLE IF NOT EXISTS estoque (
  id serial primary key,
  nome text not null,
  qtd integer not null default 0,
  unidade text not null default 'unidade',
  criado_em timestamptz default now()
);
CREATE TABLE IF NOT EXISTS alugueis (
  id serial primary key,
  cliente text not null,
  fone text,
  endereco text,
  obs text,
  entrega date not null,
  recolhimento date not null,
  status text not null default 'agendado',
  voltou date,
  itens jsonb default '[]',
  criado_em timestamptz default now()
);
ALTER TABLE estoque  DISABLE ROW LEVEL SECURITY;
ALTER TABLE alugueis DISABLE ROW LEVEL SECURITY;
INSERT INTO estoque (nome, qtd, unidade) VALUES
  ('Jogo de Mesa + Cadeiras (4)', 20, 'jogo'),
  ('Cadeira plástica avulsa',     60, 'unidade'),
  ('Mesa redonda',                15, 'unidade'),
  ('Toalha de mesa',              40, 'unidade'),
  ('Círculo de MDF',              10, 'unidade'),
  ('Tenda',                        4, 'unidade'),
  ('Palco (módulo)',               8, 'unidade'),
  ('Sistema de Som',               2, 'conjunto');
-->
</body>
</html>
