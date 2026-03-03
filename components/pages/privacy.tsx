import Link from "next/link";

export function PrivacyContent() {
  return (
    <>
      {/* Hero */}
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="max-width-large">
              <p className="font-mono text-sm text-foreground/40">
                Last updated: March 2026
              </p>
              <div className="spacer-small" />
              <h1>Privacy Policy</h1>
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
                    <li><a href="#introduction">Introduction</a></li>
                    <li><a href="#information-we-collect">Information We Collect</a></li>
                    <li><a href="#how-we-use-your-information">How We Use Your Information</a></li>
                    <li><a href="#third-party-service-providers">Third-Party Service Providers</a></li>
                    <li><a href="#data-sharing">Data Sharing</a></li>
                    <li><a href="#data-security">Data Security</a></li>
                    <li><a href="#cookies">Cookies</a></li>
                    <li><a href="#your-rights">Your Rights</a></li>
                    <li><a href="#data-retention">Data Retention</a></li>
                    <li><a href="#childrens-privacy">Children&apos;s Privacy</a></li>
                    <li><a href="#changes-to-this-policy">Changes to This Policy</a></li>
                    <li><a href="#contact">Contact</a></li>
                  </ol>
                </nav>

                <h2 id="introduction">1. Introduction</h2>
                <p>
                  Bitmern Technologies, LLC (&ldquo;Bitmern,&rdquo;
                  &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is
                  committed to protecting your privacy. This Privacy Policy explains
                  how we collect, use, disclose, and safeguard your information when
                  you visit our websites (bitmernmining.com, bitmernsolo.com,
                  shop.bitmernmining.com) and use our services.
                </p>

                <h2 id="information-we-collect">2. Information We Collect</h2>

                <h3>Account Information</h3>
                <ul>
                  <li>Email address</li>
                  <li>Display name (optional)</li>
                  <li>Timezone preference</li>
                </ul>

                <h3>Wallet Information</h3>
                <ul>
                  <li>Public blockchain wallet addresses for mining payouts</li>
                  <li>
                    These are public identifiers — we never collect or store private
                    keys or seed phrases
                  </li>
                </ul>

                <h3>Mining Data</h3>
                <ul>
                  <li>Worker names, hashrate metrics, share submissions</li>
                  <li>Performance metrics and efficiency data</li>
                  <li>Earnings records and payout history</li>
                  <li>Alert preferences and notification settings</li>
                </ul>

                <h3>Transaction Data</h3>
                <ul>
                  <li>Hardware purchase history (shop.bitmernmining.com)</li>
                  <li>Hosting contract details</li>
                  <li>
                    Payment information (processed by third-party payment providers)
                  </li>
                </ul>

                <h3>Technical Data</h3>
                <ul>
                  <li>IP address and browser user agent</li>
                  <li>Session tokens and authentication data</li>
                  <li>Pages visited and interaction data</li>
                  <li>Device type and operating system</li>
                </ul>

                <h2 id="how-we-use-your-information">3. How We Use Your Information</h2>
                <ul>
                  <li>
                    Operate and maintain mining pool services and hosting
                    infrastructure
                  </li>
                  <li>Process payouts and hardware orders</li>
                  <li>Display mining statistics and performance dashboards</li>
                  <li>
                    Send alert notifications (worker offline, hashrate drops,
                    payouts)
                  </li>
                  <li>Authenticate user accounts and maintain security</li>
                  <li>
                    Improve our services, infrastructure, and user experience
                  </li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2 id="third-party-service-providers">4. Third-Party Service Providers</h2>
                <p>
                  We work with the following providers who may process your data:
                </p>
                <div className="overflow-x-auto">
                  <table>
                    <thead>
                      <tr>
                        <th>Provider</th>
                        <th>Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Supabase</td>
                        <td>Authentication and database</td>
                      </tr>
                      <tr>
                        <td>Vercel</td>
                        <td>Web hosting and edge delivery</td>
                      </tr>
                      <tr>
                        <td>Resend</td>
                        <td>Transactional email</td>
                      </tr>
                      <tr>
                        <td>CoinGecko</td>
                        <td>Cryptocurrency price data</td>
                      </tr>
                      <tr>
                        <td>WooCommerce</td>
                        <td>E-commerce (shop)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 id="data-sharing">5. Data Sharing</h2>
                <p>
                  We do not sell, rent, or trade your personal information to third
                  parties. We may share data only:
                </p>
                <ul>
                  <li>
                    With service providers necessary to operate our services (listed
                    above)
                  </li>
                  <li>To comply with legal obligations or valid legal process</li>
                  <li>To protect our rights, privacy, safety, or property</li>
                </ul>

                <h2 id="data-security">6. Data Security</h2>
                <ul>
                  <li>All connections encrypted with TLS/HTTPS</li>
                  <li>Passwords hashed using industry-standard algorithms</li>
                  <li>Row-level database security policies</li>
                  <li>Regular security audits and monitoring</li>
                  <li>
                    We never store private keys, seed phrases, or sensitive wallet
                    credentials
                  </li>
                </ul>

                <h2 id="cookies">7. Cookies</h2>
                <p>
                  We use only essential cookies required for authentication and
                  service operation:
                </p>
                <ul>
                  <li>Authentication session cookies</li>
                  <li>Security verification cookies</li>
                  <li>
                    No advertising, tracking, or analytics cookies on the pool
                    platform
                  </li>
                </ul>
                <p>
                  See our{" "}
                  <Link href="/cookies">
                    Cookie Policy
                  </Link>{" "}
                  for full details.
                </p>

                <h2 id="your-rights">8. Your Rights</h2>
                <p>You may:</p>
                <ul>
                  <li>
                    Access and review your personal information via your account
                    settings
                  </li>
                  <li>
                    Modify your profile, wallet addresses, and alert preferences
                  </li>
                  <li>Request deletion of your account and associated data</li>
                  <li>Export your mining data and earnings history</li>
                  <li>Opt out of non-essential email communications</li>
                </ul>

                <h2 id="data-retention">9. Data Retention</h2>
                <p>
                  We retain your data for as long as your account is active or as
                  needed to provide services. Mining data and payout records may be
                  retained for compliance purposes. You may request deletion at any
                  time.
                </p>

                <h2 id="childrens-privacy">10. Children&apos;s Privacy</h2>
                <p>
                  Our services are not intended for individuals under 18 years of
                  age. We do not knowingly collect information from children.
                </p>

                <h2 id="changes-to-this-policy">11. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. Material
                  changes will be communicated via email or a prominent notice on our
                  website at least 14 days before taking effect.
                </p>

                <h2 id="contact">12. Contact</h2>
                <p>For privacy inquiries:</p>
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
                    href="#"
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
