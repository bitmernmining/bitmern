export function TermsContent() {
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
              <h1>Terms & Conditions</h1>
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
                    <li><a href="#agreement">Agreement</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#account-requirements">Account Requirements</a></li>
                    <li><a href="#hosting-services">Hosting Services</a></li>
                    <li><a href="#hardware-sales">Hardware Sales</a></li>
                    <li><a href="#solo-mining-pool">Solo Mining Pool</a></li>
                    <li><a href="#institutional-services">Institutional Services</a></li>
                    <li><a href="#intellectual-property">Intellectual Property</a></li>
                    <li><a href="#limitation-of-liability">Limitation of Liability</a></li>
                    <li><a href="#account-termination">Account Termination</a></li>
                    <li><a href="#governing-law">Governing Law</a></li>
                    <li><a href="#changes">Changes</a></li>
                    <li><a href="#contact">Contact</a></li>
                  </ol>
                </nav>

                <h2 id="agreement">1. Agreement</h2>
                <p>
                  These Terms & Conditions (&ldquo;Terms&rdquo;) govern your use of
                  the websites and services provided by Bitmern Technologies, LLC
                  (&ldquo;Bitmern,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or
                  &ldquo;us&rdquo;), including bitmernmining.com, bitmernsolo.com,
                  shop.bitmernmining.com, and all associated services. By accessing
                  or using our services, you agree to be bound by these Terms.
                </p>

                <h2 id="services">2. Services</h2>
                <p>Bitmern provides:</p>
                <ul>
                  <li>
                    <strong>ASIC hosting and colocation</strong> at our global
                    facilities
                  </li>
                  <li>
                    <strong>Hardware sales</strong> through shop.bitmernmining.com
                  </li>
                  <li>
                    <strong>Solo mining pool</strong> at bitmernsolo.com
                  </li>
                  <li>
                    <strong>Institutional investment products</strong> including the
                    Blocks Fund
                  </li>
                  <li>
                    <strong>Firmware optimization</strong> services (MARA Firmware)
                  </li>
                  <li>
                    <strong>Mining monitoring</strong> through the SuperApp dashboard
                  </li>
                </ul>

                <h2 id="account-requirements">3. Account Requirements</h2>
                <ul>
                  <li>A valid email address is required to create an account</li>
                  <li>
                    You are responsible for maintaining the security of your account
                    credentials
                  </li>
                  <li>You must be at least 18 years old to use our services</li>
                  <li>
                    You must comply with all applicable laws in your jurisdiction
                  </li>
                </ul>

                <h2 id="hosting-services">4. Hosting Services</h2>
                <ul>
                  <li>
                    Hosting fees are charged per kWh consumed at the contracted rate
                  </li>
                  <li>Fee changes require 30 days advance written notice</li>
                  <li>You retain full ownership of all hosted equipment</li>
                  <li>Equipment removal requires 30 days written notice</li>
                  <li>
                    Bitmern maintains 97% uptime target (99.3% for Ethiopia) but
                    does not guarantee uninterrupted service
                  </li>
                  <li>
                    Bitmern is not liable for losses due to power outages, network
                    disruptions, or force majeure events
                  </li>
                </ul>

                <h2 id="hardware-sales">5. Hardware Sales</h2>
                <ul>
                  <li>
                    All hardware sales through shop.bitmernmining.com are subject to
                    availability
                  </li>
                  <li>
                    Prices are listed in EUR with multi-currency support (USD, AED,
                    GBP)
                  </li>
                  <li>
                    Warranty terms follow manufacturer specifications (typically 6-12
                    months)
                  </li>
                  <li>
                    Shipping timelines vary by product and destination (typically 4-6
                    weeks)
                  </li>
                  <li>Returns and refunds are subject to manufacturer policy</li>
                </ul>

                <h2 id="solo-mining-pool">6. Solo Mining Pool</h2>
                <ul>
                  <li>
                    The pool charges a flat 1% fee on block rewards, automatically
                    deducted before crediting your balance
                  </li>
                  <li>Fee changes require 30 days advance notice</li>
                  <li>
                    Solo mining is inherently probabilistic — no guarantees on
                    earnings, block discovery timing, or performance
                  </li>
                  <li>
                    Incorrect wallet addresses may result in unrecoverable payouts
                  </li>
                  <li>
                    Bitmern may add or remove supported coins with reasonable notice
                  </li>
                  <li>
                    Automatic payouts are processed when minimum thresholds are met;
                    blockchain network fees are deducted
                  </li>
                </ul>

                <h2 id="institutional-services">7. Institutional Services</h2>
                <ul>
                  <li>
                    Blocks Fund and institutional services are available to
                    accredited and qualified investors only
                  </li>
                  <li>
                    All institutional products are subject to separate subscription
                    agreements
                  </li>
                  <li>Past performance does not guarantee future results</li>
                  <li>
                    Bitcoin mining involves significant risks including market
                    volatility, regulatory changes, and technological shifts
                  </li>
                </ul>

                <h2 id="intellectual-property">8. Intellectual Property</h2>
                <p>
                  All content, software, designs, and branding on our websites are
                  the property of Bitmern Technologies, LLC. You may not reproduce,
                  distribute, or create derivative works without written permission.
                </p>

                <h2 id="limitation-of-liability">9. Limitation of Liability</h2>
                <p>
                  Services are provided &ldquo;as is&rdquo; without warranties of
                  any kind, express or implied. Bitmern is not liable for:
                </p>
                <ul>
                  <li>Loss of mining revenue due to downtime or technical issues</li>
                  <li>Cryptocurrency price fluctuations</li>
                  <li>
                    Incorrect wallet addresses or misconfigured mining equipment
                  </li>
                  <li>Third-party service interruptions</li>
                  <li>Force majeure events</li>
                </ul>

                <h2 id="account-termination">10. Account Termination</h2>
                <ul>
                  <li>Users may close their account at any time</li>
                  <li>
                    Bitmern may suspend or terminate accounts that violate these
                    Terms
                  </li>
                  <li>
                    Pending balances above minimum thresholds will be transferred to
                    the registered wallet address upon termination
                  </li>
                </ul>

                <h2 id="governing-law">11. Governing Law</h2>
                <p>
                  These Terms are governed by the laws of the State of Wyoming,
                  United States. Any disputes shall be resolved through binding
                  arbitration.
                </p>

                <h2 id="changes">12. Changes</h2>
                <p>
                  We may update these Terms from time to time. Material changes
                  require 14 days email notice. Continued use after changes take
                  effect constitutes acceptance.
                </p>

                <h2 id="contact">13. Contact</h2>
                <p>For legal inquiries:</p>
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
