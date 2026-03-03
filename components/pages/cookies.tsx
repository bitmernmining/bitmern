export function CookiesContent() {
  return (
    <>
      {/* Hero */}
      <div id="top" className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="max-width-large">
              <p className="font-mono text-sm text-foreground/40">
                Last updated: March 2026
              </p>
              <div className="spacer-small" />
              <h1>Cookie Policy</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="prose max-width-large">
                {/* Table of Contents */}
                <nav className="mb-12 rounded-lg border border-border/60 p-6">
                  <h2 className="!mt-0 !mb-4 font-heading text-sm font-semibold uppercase tracking-widest text-foreground/40">
                    Contents
                  </h2>
                  <ol className="space-y-2 text-sm">
                    <li><a href="#what-are-cookies">What Are Cookies</a></li>
                    <li><a href="#cookies-we-use">Cookies We Use</a></li>
                    <li><a href="#no-third-party-cookies">No Third-Party Cookies</a></li>
                    <li><a href="#managing-cookies">Managing Cookies</a></li>
                    <li><a href="#changes">Changes</a></li>
                    <li><a href="#contact">Contact</a></li>
                  </ol>
                </nav>

                <h2 id="what-are-cookies">1. What Are Cookies</h2>
                <p>
                  Cookies are small text files stored on your device when you visit a
                  website. They help websites function properly, remember your
                  preferences, and provide usage analytics.
                </p>

                <h2 id="cookies-we-use">2. Cookies We Use</h2>
                <p>
                  Bitmern uses only essential cookies required for our services to
                  function. We do not use advertising, tracking, or third-party
                  analytics cookies.
                </p>
                <div className="overflow-x-auto">
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Cookie</th>
                        <th scope="col">Purpose</th>
                        <th scope="col">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <code className="font-mono text-sm">
                            sb-*-auth-token
                          </code>
                        </td>
                        <td>
                          Authentication session for logged-in users
                        </td>
                        <td>Session / 1 year</td>
                      </tr>
                      <tr>
                        <td>
                          <code className="font-mono text-sm">
                            sb-*-auth-token-code-verifier
                          </code>
                        </td>
                        <td>
                          OAuth authentication verification
                        </td>
                        <td>Session</td>
                      </tr>
                      <tr>
                        <td>
                          <code className="font-mono text-sm">_vercel_jwt</code>
                        </td>
                        <td>
                          Vercel hosting and preview protection
                        </td>
                        <td>Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 id="no-third-party-cookies">3. No Third-Party Cookies</h2>
                <p>We do not use:</p>
                <ul>
                  <li>Advertising or retargeting cookies</li>
                  <li>Social media tracking cookies</li>
                  <li>
                    Third-party analytics cookies on the mining pool platform
                  </li>
                </ul>

                <h2 id="managing-cookies">4. Managing Cookies</h2>
                <p>You can control cookies through your browser settings:</p>
                <ul>
                  <li>
                    <strong>Chrome:</strong> Settings &gt; Privacy and Security &gt;
                    Cookies
                  </li>
                  <li>
                    <strong>Firefox:</strong> Settings &gt; Privacy & Security &gt;
                    Cookies
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies
                  </li>
                  <li>
                    <strong>Edge:</strong> Settings &gt; Privacy &gt; Cookies
                  </li>
                </ul>
                <p className="text-foreground/60">
                  Note: Disabling essential cookies may prevent you from logging in
                  or using authenticated features.
                </p>

                <h2 id="changes">5. Changes</h2>
                <p>
                  We may update this Cookie Policy as our services evolve. Changes
                  will be posted on this page with an updated date.
                </p>

                <h2 id="contact">6. Contact</h2>
                <p>For questions about our cookie practices:</p>
                <ul className="list-none">
                  <li>
                    Email:{" "}
                    <a href="mailto:info@bitmernmining.com">
                      info@bitmernmining.com
                    </a>
                  </li>
                  <li>Bitmern Technologies, LLC</li>
                </ul>

                <div className="mt-16 border-t border-border/40 pt-8">
                  <a
                    href="#top"
                    className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors duration-200"
                  >
                    &uarr; Back to top
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
