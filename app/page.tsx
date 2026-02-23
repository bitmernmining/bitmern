import Link from "next/link";

export default function Home() {
  return (
    <div className="page-wrapper">
      <div className="main-wrapper">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", textAlign: "center" }}>
              <img src="/images/Logo.svg" alt="Bitmern Mining" style={{ width: "200px", marginBottom: "2rem" }} />
              <h1>Bitmern Mining</h1>
              <div className="margin-top margin-small">
                <p className="text-size-medium">Site under construction. View the design system:</p>
              </div>
              <div className="margin-top margin-medium">
                <Link href="/style-guide" className="button">
                  View Style Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
