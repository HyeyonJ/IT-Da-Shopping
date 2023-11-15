import { NavLink } from "react-router-dom";

export function Navbar() {
  const navStyle: React.CSSProperties = {
    // margin: "20px", // 원하는 마진 값 설정
    height: "60px", // 원하는 높이 값 설정
    display: "flex",
    alignItems: "center",
    boxShadow: "0 1px 10px rgba(0, 0, 0, 0.1)" // 그림자 스타일 설정
  };

  const logoStyle = {
    height: "30px", // 원하는 높이 값 설정
    marginLeft: "20px" // 로고와 다른 링크 사이의 간격 설정
  };

  const logoContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center" // 이미지를 수평으로 가운데 정렬
  };

  return (
    <>
      <nav
        style={navStyle}
        className="navbar-container bg-white shadow-sm mb-3"
      >
        <div style={logoContainerStyle}>
          <NavLink to="/">
            <img src="./itDa.png" alt="로고" style={logoStyle} />
          </NavLink>
        </div>
      </nav>
    </>
  );
}
