import { useNavigate } from "react-router-dom";
export default function Navbar({
  dark,
  setDark,
  showAuthButtons = true,
  showLogout = false
}) {
    const navigate = useNavigate();
  const s = {
    nav: { background:dark? "#0a1210": "#1A312C", padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(137,215,183,0.1)", position: "sticky", top: 0, zIndex: 100 },

    brand: { fontSize: 20, fontWeight: 700, color: "#89D7B7", cursor: "pointer" },

    right: { display: "flex", gap: 10, alignItems: "center" },

    toggle: { background: "rgba(137,215,183,0.15)", border: "1px solid rgba(137,215,183,0.3)", borderRadius: 20, padding: "5px 12px", cursor: "pointer", fontSize: 13, color: "#89D7B7" },

    btnOutline: { background: "transparent", border: "1px solid #89D7B7", color: "#89D7B7", padding: "6px 16px", borderRadius: 6, fontSize: 13, cursor: "pointer" },

    btnFill: { background: "#428475", color: "white", border: "none", padding: "6px 16px", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" },
  };

  return(
    <nav style={s.nav}>
        <div style={s.brand} onClick={()=>navigate("/")}>🎬 UniTube</div>
        <div style={s.right}>
         <button style={s.toggle} onClick={() => setDark(!dark)}>
          {dark ? "☀️ Light" : "🌙 Dark"}
         </button>
         {showAuthButtons && (
          <>
            <button style={s.btnOutline} onClick={() => navigate("/login")}>Sign in</button>
            <button style={s.btnFill} onClick={() => navigate("/register")}>Get started</button>
          </>
        )}
        {showLogout && (
          <button style={s.btnOutline} onClick={() => navigate("/login")}>Logout</button>
        )}
      </div>
    </nav>
  )
}