import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Style Guide | Bitmern Mining",
  description: "Bitmern Mining design system and style guide.",
};

/* ——— SVG Icon Components ——— */

function CubeIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M20.73 7.12L20.59 6.87C20.4094 6.56769 20.1547 6.31643 19.85 6.14L13.14 2.27C12.8362 2.09375 12.4913 2.00062 12.14 2H11.85C11.4987 2.00062 11.1538 2.09375 10.85 2.27L4.14 6.15C3.83697 6.32526 3.58526 6.57697 3.41 6.88L3.27 7.13C3.09375 7.43384 3.00062 7.77874 3 8.13V15.88C3.00062 16.2313 3.09375 16.5762 3.27 16.88L3.41 17.13C3.58979 17.4295 3.84049 17.6802 4.14 17.86L10.86 21.73C11.1623 21.9099 11.5082 22.0033 11.86 22H12.14C12.4913 21.9994 12.8362 21.9063 13.14 21.73L19.85 17.85C20.156 17.6787 20.4087 17.426 20.58 17.12L20.73 16.87C20.9041 16.5653 20.9971 16.221 21 15.87V8.12C20.9994 7.76874 20.9063 7.42384 20.73 7.12ZM11.85 4H12.14L18 7.38L12 10.84L6 7.38L11.85 4ZM13 19.5L18.85 16.12L19 15.87V9.11L13 12.58V19.5Z" fill="currentColor" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M17.5 15.8333V11.25C17.5 11.0199 17.3135 10.8333 17.0833 10.8333H16.25C16.0199 10.8333 15.8333 11.0199 15.8333 11.25V15.8333H4.16667V4.16667H8.75C8.98012 4.16667 9.16667 3.98012 9.16667 3.75V2.91667C9.16667 2.68655 8.98012 2.5 8.75 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333ZM17.0917 2.69167L17.3167 2.91667V2.90833C17.4299 3.02132 17.4955 3.17342 17.5 3.33333V8.75C17.5 8.98012 17.3135 9.16667 17.0833 9.16667H16.25C16.0199 9.16667 15.8333 8.98012 15.8333 8.75V5.35L8.8 12.375C8.72176 12.4539 8.61527 12.4982 8.50417 12.4982C8.39307 12.4982 8.28657 12.4539 8.20833 12.375L7.625 11.7917C7.54612 11.7134 7.50175 11.6069 7.50175 11.4958C7.50175 11.3847 7.54612 11.2782 7.625 11.2L14.6583 4.16667H11.25C11.0199 4.16667 10.8333 3.98012 10.8333 3.75V2.91667C10.8333 2.68655 11.0199 2.5 11.25 2.5H16.6667C16.8278 2.50668 16.98 2.57535 17.0917 2.69167Z" fill="currentColor" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.6893 7.25L6.96967 1.53033L8.03033 0.469666L15.5607 8L8.03033 15.5303L6.96967 14.4697L12.6893 8.75H0.5V7.25H12.6893Z" fill="currentColor" />
    </svg>
  );
}

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.";

/* ——— Reusable helpers ——— */

function ButtonRow({ labels, children }: { labels: string[]; children: React.ReactNode }) {
  return (
    <div className="w-layout-grid rl-styleguide_item-row is-button-row">
      <div className="class-label-row">
        {labels.map((l) => (
          <div key={l} className="rl-styleguide_label">{l}</div>
        ))}
      </div>
      <div className="button-group">{children}</div>
    </div>
  );
}

function SpacingItem({ label, className }: { label: string; className: string }) {
  return (
    <div className="w-layout-grid rl-styleguide_item is-stretch">
      <div className="rl-styleguide_label">{label}</div>
      <div className="rl-styleguide_spacing">
        <div className={className}>
          <div className="rl-styleguide_empty-box"></div>
        </div>
      </div>
    </div>
  );
}

/* ——— Page ——— */

export default function StyleGuidePage() {
  return (
    <div className="page-wrapper">
      <div className="main-wrapper">
        <div className="padding-global">
          <div className="container-large">
            {/* Nav */}
            <div className="rl-styleguide_nav">
              {["typography", "colors", "UI-elements", "radius", "effects", "structure-classes"].map((id) => (
                <a key={id} href={`#${id}`} className="rl-styleguide_nav-link">
                  <div>{id.replace(/-/g, " ").replace("UI elements", "UI Elements").replace(/\b\w/g, (c) => c.toUpperCase())}</div>
                </a>
              ))}
            </div>

            <div className="rl-styleguide_elements">
              {/* Header */}
              <div className="rl-styleguide_header">
                <div className="rl-styleguide_heading-wrapper">
                  <img src="/images/Logo.svg" loading="lazy" alt="Bitmern Mining" />
                  <div className="margin-top margin-small">
                    <div>Bitmern Style Guide V1.0</div>
                  </div>
                </div>
                <div className="button-group">
                  <a href="https://www.finsweet.com/client-first/docs/intro" target="_blank" rel="noopener noreferrer" className="button is-secondary is-small is-icon">
                    <div>Relume Resources</div>
                    <div className="icon-embed-xsmall"><ExternalLinkIcon /></div>
                  </a>
                  <a href="https://www.finsweet.com/client-first/docs/intro" target="_blank" rel="noopener noreferrer" className="button is-secondary is-small is-icon">
                    <div>Client-First v2.1</div>
                    <div className="icon-embed-xsmall"><ExternalLinkIcon /></div>
                  </a>
                </div>
              </div>

              {/* ======== TYPOGRAPHY ======== */}
              <div id="typography" className="rl-styleguide_typography">
                <div className="rl-styleguide_heading">Typography</div>

                {/* HTML Heading Tags */}
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">
                    HTML Heading Tags<br /><span className="rl-styleguide_subheading-small">HTML tags define default Heading styles.</span>
                  </div>
                  {([1, 2, 3, 4, 5, 6] as const).map((n) => (
                    <div key={n} className="w-layout-grid rl-styleguide_item-row">
                      <div className="rl-styleguide_label is-html-tag">All H{n} Headings</div>
                      {n === 1 && <h1>Heading 1</h1>}
                      {n === 2 && <h2>Heading 2</h2>}
                      {n === 3 && <h3>Heading 3</h3>}
                      {n === 4 && <h4>Heading 4</h4>}
                      {n === 5 && <h5>Heading 5</h5>}
                      {n === 6 && <h6>Heading 6</h6>}
                    </div>
                  ))}
                </div>

                {/* Heading Classes */}
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">
                    Heading Classes<br /><span className="rl-styleguide_subheading-small">Heading classes when typography style doesn&apos;t match the default HTML tag.</span>
                  </div>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="w-layout-grid rl-styleguide_item-row">
                      <div className="rl-styleguide_label">heading-style-h{n}</div>
                      <h2 className={`heading-style-h${n}`}>Heading-style-h{n}</h2>
                    </div>
                  ))}
                </div>

                {/* Other HTML Tags */}
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">
                    Other HTML Tags<br /><span className="rl-styleguide_subheading-small">HTML tags define default text styles.</span>
                  </div>
                  <div className="w-layout-grid rl-styleguide_item-row">
                    <div className="rl-styleguide_label is-html-tag">All Paragraphs</div>
                    <p className="paragraph">{LOREM}</p>
                  </div>
                  <div className="w-layout-grid rl-styleguide_item-row">
                    <div className="rl-styleguide_label is-html-tag">All Links</div>
                    <a href="#">All Links</a>
                  </div>
                  <div className="w-layout-grid rl-styleguide_item-row">
                    <div className="rl-styleguide_label is-html-tag">All Block Quotes</div>
                    <blockquote>Block Quote</blockquote>
                  </div>
                  <div className="w-layout-grid rl-styleguide_item-row">
                    <div className="rl-styleguide_label is-html-tag">All Unordered Lists</div>
                    <ul role="list" className="w-list-unstyled">
                      <li><p>No bullet list</p></li>
                      <li><p>No bullet list</p></li>
                    </ul>
                  </div>
                  <div className="w-layout-grid rl-styleguide_item-row">
                    <div className="rl-styleguide_label is-html-tag">All Unordered Lists</div>
                    <ul role="list">
                      <li><p>No bullet list</p></li>
                      <li><p>No bullet list</p></li>
                    </ul>
                  </div>
                  <div className="w-layout-grid rl-styleguide_item-row">
                    <div className="rl-styleguide_label is-html-tag">All Ordered Lists</div>
                    <ol role="list">
                      <li><p>No bullet list</p></li>
                      <li><p>No bullet list</p></li>
                      <li><p>No bullet list</p></li>
                    </ol>
                  </div>
                </div>

                {/* Text Sizes */}
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">
                    Text Sizes<br /><span className="rl-styleguide_subheading-small">Text sizes classes when typography size doesn&apos;t match the default HTML tag.</span>
                  </div>
                  {["large", "medium", "regular", "small", "tiny"].map((size) => (
                    <div key={size} className="w-layout-grid rl-styleguide_item-row">
                      <div className="rl-styleguide_label">text-size-{size}</div>
                      <p className={`text-size-${size}`}>{LOREM}</p>
                    </div>
                  ))}
                </div>

                {/* Text Weights */}
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">
                    Text Weights<br /><span className="rl-styleguide_subheading-small">Text weight classes when typography weight doesn&apos;t match the default HTML tag.</span>
                  </div>
                  {[
                    ["xbold", "800"],
                    ["bold", "700"],
                    ["semibold", "600"],
                    ["medium", "500"],
                    ["normal", "400"],
                    ["light", "300"],
                  ].map(([name, weight]) => (
                    <div key={name} className="w-layout-grid rl-styleguide_item-row">
                      <div className="rl-styleguide_label">text-weight-{name}</div>
                      <div className={`text-weight-${name}`}>text-weight-{name} ({weight})</div>
                    </div>
                  ))}
                </div>

                {/* Text Styles */}
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">
                    Text Styles<br /><span className="rl-styleguide_subheading-small">Text style classes when typography style doesn&apos;t match the default HTML tag.</span>
                  </div>
                  {["italic", "strikethrough", "allcaps", "nowrap", "quote", "link"].map((style) => (
                    <div key={style} className="w-layout-grid rl-styleguide_item-row">
                      <div className="rl-styleguide_label">text-style-{style}</div>
                      <div className={`text-style-${style}`}>text-style-{style}</div>
                    </div>
                  ))}
                  <div className="w-layout-grid rl-styleguide_item-row">
                    <div className="rl-styleguide_label">text-style-2lines</div>
                    <div className="text-style-2lines">{LOREM}</div>
                  </div>
                  <div className="w-layout-grid rl-styleguide_item-row">
                    <div className="rl-styleguide_label">text-style-3lines</div>
                    <div className="text-style-3lines">{LOREM} {LOREM}</div>
                  </div>
                  <div className="w-layout-grid rl-styleguide_item-row">
                    <div className="rl-styleguide_label">text-style-muted</div>
                    <div className="text-style-muted">text-style-muted</div>
                  </div>
                  <div className="w-layout-grid rl-styleguide_item-row">
                    <div className="rl-styleguide_label">text-style-tagline</div>
                    <div className="text-style-tagline">text-style-tagline</div>
                  </div>
                </div>

                {/* Text Alignment */}
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">
                    Text Alignment<br /><span className="rl-styleguide_subheading-small">Text alignment classes when typography alignment doesn&apos;t match the default HTML tag.</span>
                  </div>
                  {["left", "center", "right"].map((align) => (
                    <div key={align} className="w-layout-grid rl-styleguide_item-row">
                      <div className="rl-styleguide_label">text-align-{align}</div>
                      <div className={`text-align-${align}`}>text-align-{align}</div>
                    </div>
                  ))}
                </div>

                {/* Rich Text */}
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">Rich Text</div>
                  <div className="w-layout-grid rl-styleguide_item-row">
                    <div className="rl-styleguide_label">text-rich-text</div>
                    <div className="text-rich-text">
                      <h1>Heading 1</h1>
                      <h2>Heading 2</h2>
                      <h3>Heading 3</h3>
                      <h4>Heading 4</h4>
                      <h5>Heading 5</h5>
                      <h6>Heading 6</h6>
                      <blockquote>This is a block quote</blockquote>
                      <p>The rich text element allows you to create and format headings, paragraphs, blockquotes, images, and video all in one place instead of having to add and format them individually. Just double-click and easily create content.</p>
                      <p><a href="#">This is a link inside of a rich text</a></p>
                      <ul role="list">
                        <li>List item</li>
                        <li>List item</li>
                        <li>List item</li>
                      </ul>
                      <ol role="list">
                        <li>List item</li>
                        <li>List item</li>
                        <li>List item</li>
                      </ol>
                      <figure>
                        <div><img src="/images/Placeholder-Image.png" loading="lazy" alt="" /></div>
                        <figcaption>Caption goes here</figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>

              {/* ======== COLORS ======== */}
              <div id="colors" className="rl-styleguide_colors">
                <div className="rl-styleguide_heading">Colors</div>
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">
                    Color Schemes<br /><span className="rl-styleguide_subheading-small">Manage your colors easily with global color schemes simply adding the color scheme class to the section you want it applied to.</span>
                  </div>
                  <div className="w-layout-grid rl-styleguide_scheme-list">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="rl-styleguide_scheme">
                        <div className="margin-bottom margin-xsmall">
                          <div className="rl-styleguide_label">color-scheme-{n}</div>
                        </div>
                        <div className="rl-styleguide_scheme-card">
                          <div className={`color-scheme-${n}`}>
                            <div className="rl-styleguide_scheme-wrapper">
                              <div className="margin-bottom margin-xsmall">
                                <h5>Scheme {n}</h5>
                              </div>
                              <div className="rl-styleguide_scheme-foreground">
                                <div className="rl-styleguide-accent">
                                  <div className="icon-embed-xsmall"><CubeIcon /></div>
                                </div>
                                <p className="text-size-regular">Text color</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ======== UI ELEMENTS ======== */}
              <div id="UI-elements" className="rl-styleguide_ui-elements">
                <div className="rl-styleguide_heading">UI Elements</div>

                {/* Buttons */}
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">Buttons</div>
                  <div className="w-layout-grid rl-styleguide_button-list">
                    <ButtonRow labels={["button"]}><a href="#" className="button">Button</a></ButtonRow>
                    <ButtonRow labels={["button", "is-small"]}><a href="#" className="button is-small">Button</a></ButtonRow>
                    <ButtonRow labels={["button", "is-secondary"]}><a href="#" className="button is-secondary">Button</a></ButtonRow>
                    <ButtonRow labels={["button", "is-secondary", "is-small"]}><a href="#" className="button is-secondary is-small">Button</a></ButtonRow>
                    <ButtonRow labels={["button", "is-link"]}><a href="#" className="button is-link">Button</a></ButtonRow>
                  </div>
                  <div>To use on a dark background, simple use the add-on class <span className="rl-styleguide_label">is-alternate</span></div>
                  <div className="w-layout-grid rl-styleguide_button-list background-color-black">
                    <ButtonRow labels={["button", "is-alternate"]}><a href="#" className="button is-alternate">Button</a></ButtonRow>
                    <ButtonRow labels={["button", "is-alternate", "is-small"]}><a href="#" className="button is-alternate is-small">Button</a></ButtonRow>
                    <ButtonRow labels={["button", "is-secondary", "is-alternate"]}><a href="#" className="button is-secondary is-alternate">Button</a></ButtonRow>
                    <ButtonRow labels={["button", "is-secondary", "is-small", "is-alternate"]}><a href="#" className="button is-secondary is-small is-alternate">Button</a></ButtonRow>
                    <ButtonRow labels={["button", "is-link", "is-alternate"]}><a href="#" className="button is-link is-alternate">Button</a></ButtonRow>
                  </div>
                </div>

                {/* Buttons With Icons */}
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">Buttons With Icons</div>
                  <div className="w-layout-grid rl-styleguide_button-list">
                    <ButtonRow labels={["button", "is-icon"]}>
                      <a href="#" className="button is-icon"><div>Button</div><div className="icon-embed-xsmall"><CubeIcon /></div></a>
                    </ButtonRow>
                    <ButtonRow labels={["button", "is-small", "is-icon"]}>
                      <a href="#" className="button is-small is-icon"><div>Button</div><div className="icon-embed-xsmall"><CubeIcon /></div></a>
                    </ButtonRow>
                    <ButtonRow labels={["button", "is-secondary", "is-icon"]}>
                      <a href="#" className="button is-secondary is-icon"><div>Button</div><div className="icon-embed-xsmall"><CubeIcon /></div></a>
                    </ButtonRow>
                    <ButtonRow labels={["button", "is-secondary", "is-small", "is-icon"]}>
                      <a href="#" className="button is-secondary is-small is-icon"><div>Button</div><div className="icon-embed-xsmall"><CubeIcon /></div></a>
                    </ButtonRow>
                    <ButtonRow labels={["button", "is-link", "is-icon"]}>
                      <a href="#" className="button is-link is-icon"><div>Button</div><div className="icon-embed-xsmall"><CubeIcon /></div></a>
                    </ButtonRow>
                  </div>
                  <div className="w-layout-grid rl-styleguide_button-list background-color-black">
                    <ButtonRow labels={["button", "is-icon", "is-alternate"]}>
                      <a href="#" className="button is-icon is-alternate"><div>Button</div><div className="icon-embed-xsmall"><CubeIcon /></div></a>
                    </ButtonRow>
                    <ButtonRow labels={["button", "is-small", "is-icon", "is-alternate"]}>
                      <a href="#" className="button is-small is-icon is-alternate"><div>Button</div><div className="icon-embed-xsmall"><CubeIcon /></div></a>
                    </ButtonRow>
                    <ButtonRow labels={["button", "is-secondary", "is-icon", "is-alternate"]}>
                      <a href="#" className="button is-secondary is-icon is-alternate"><div>Button</div><div className="icon-embed-xsmall"><CubeIcon /></div></a>
                    </ButtonRow>
                    <ButtonRow labels={["button", "is-secondary", "is-small", "is-icon", "is-alternate"]}>
                      <a href="#" className="button is-secondary is-small is-icon is-alternate"><div>Button</div><div className="icon-embed-xsmall"><CubeIcon /></div></a>
                    </ButtonRow>
                    <ButtonRow labels={["button", "is-link", "is-icon", "is-alternate"]}>
                      <a href="#" className="button is-link is-icon is-alternate"><div>Button</div><div className="icon-embed-xsmall"><CubeIcon /></div></a>
                    </ButtonRow>
                  </div>
                </div>

                {/* Other UI Elements */}
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">Other UI Elements</div>
                  <div className="w-layout-grid rl-styleguide_button-list">
                    <div className="w-layout-grid rl-styleguide_item-row">
                      <div className="class-label-row">
                        <div className="rl-styleguide_label">tab-link</div>
                      </div>
                      <div className="tabs-menu">
                        <a href="#" className="tab-link w--current"><div>Monthly</div></a>
                        <a href="#" className="tab-link"><div>Yearly</div></a>
                      </div>
                    </div>
                    <div className="w-layout-grid rl-styleguide_item-row">
                      <div className="class-label-row">
                        <div className="rl-styleguide_label">category-filter-link</div>
                      </div>
                      <div className="category-filter-menu">
                        <a href="#" className="category-filter-link w--current"><div>View all</div></a>
                        <a href="#" className="category-filter-link"><div>Category one</div></a>
                      </div>
                    </div>
                    <div className="w-layout-grid rl-styleguide_item-row">
                      <div className="class-label-row">
                        <div className="rl-styleguide_label">slider-arrow</div>
                      </div>
                      <a href="#" className="slider-arrow">
                        <div className="slider-arrow-icon_default"><ArrowRightIcon /></div>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">
                    Tags<br /><span className="rl-styleguide_subheading-small">Linkable labels that categorize or highlight information on cards, products and posts</span>
                  </div>
                  <div className="w-layout-grid rl-styleguide_button-list">
                    <ButtonRow labels={["tag"]}><div className="tag">Tag</div></ButtonRow>
                    <ButtonRow labels={["tag", "is-text"]}><div className="tag is-text">Tag</div></ButtonRow>
                  </div>
                  <div className="w-layout-grid rl-styleguide_button-list background-color-black">
                    <ButtonRow labels={["tag", "is-alternate"]}><div className="tag is-alternate">Tag</div></ButtonRow>
                    <ButtonRow labels={["tag", "is-text", "is-alternate"]}><div className="tag is-text is-alternate">Tag</div></ButtonRow>
                  </div>
                </div>

                {/* Form Elements */}
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">Form Elements</div>
                  <div className="rl-styleguide_form-wrapper">
                    <div className="form_component">
                      <form className="form_form">
                        <div className="w-layout-grid rl-styleguide_item-row">
                          <div className="class-label-column">
                            <div className="class-label-row"><div className="rl-styleguide_label">form_field-label</div></div>
                            <div className="class-label-row"><div className="rl-styleguide_label">form_input</div></div>
                          </div>
                          <div className="form_field-wrapper">
                            <label htmlFor="field-1" className="form_field-label">.form_field-label</label>
                            <input className="form_input" maxLength={256} name="field" placeholder=".form_input" type="text" id="field-1" />
                          </div>
                        </div>
                        <div className="w-layout-grid rl-styleguide_item-row">
                          <div className="class-label-column">
                            <div className="class-label-row">
                              <div className="rl-styleguide_label">form_input</div>
                              <div className="rl-styleguide_label">is-text-area</div>
                            </div>
                          </div>
                          <div className="form_field-wrapper">
                            <label htmlFor="field-2" className="form_field-label">.form_field-label</label>
                            <textarea name="Field" maxLength={5000} id="field-2" placeholder=".form_input.textarea" className="form_input is-text-area"></textarea>
                          </div>
                        </div>
                        <div className="w-layout-grid rl-styleguide_item-row">
                          <div className="class-label-column">
                            <div className="class-label-row">
                              <div className="rl-styleguide_label">form_input</div>
                              <div className="rl-styleguide_label">is-select-input</div>
                            </div>
                          </div>
                          <div className="form_field-wrapper">
                            <label htmlFor="field-3" className="form_field-label">.form_field-label</label>
                            <select id="field-3" name="Field" className="form_input is-select-input">
                              <option value="">Select one...</option>
                              <option value="First">First Choice</option>
                              <option value="Second">Second Choice</option>
                              <option value="Third">Third Choice</option>
                            </select>
                          </div>
                        </div>
                        <div className="w-layout-grid rl-styleguide_item-row">
                          <div className="class-label-column">
                            <div className="class-label-row"><div className="rl-styleguide_label">form_checkbox</div></div>
                          </div>
                          <label className="form_checkbox">
                            <div className="form_checkbox-icon"></div>
                            <span className="form_checkbox-label">Checkbox</span>
                          </label>
                        </div>
                        <div className="w-layout-grid rl-styleguide_item-row">
                          <div className="class-label-column">
                            <div className="class-label-row"><div className="rl-styleguide_label">form_radio</div></div>
                          </div>
                          <label className="form_radio">
                            <div className="form_radio-icon"></div>
                            <span className="form_radio-label">Radio</span>
                          </label>
                        </div>
                        <div className="w-layout-grid rl-styleguide_item-row">
                          <div className="class-label-column">
                            <div className="class-label-row"><div className="rl-styleguide_label">button</div></div>
                          </div>
                          <input type="submit" className="button" value="Submit" />
                        </div>
                      </form>
                      <div className="form_message-success">
                        <div>Thank you! Your submission has been received!</div>
                      </div>
                      <div className="form_message-error">
                        <div>Oops! Something went wrong while submitting the form.</div>
                      </div>
                    </div>
                  </div>
                  <div>To use Forms on a dark background, simply use the add-on class <span className="rl-styleguide_label">is-alternate</span></div>
                  <div className="rl-styleguide_form-wrapper background-color-black">
                    <div className="form_component">
                      <form className="form_form">
                        <div className="w-layout-grid rl-styleguide_item-row">
                          <div className="class-label-column">
                            <div className="class-label-row"><div className="rl-styleguide_label">form_field-label</div></div>
                            <div className="class-label-row"><div className="rl-styleguide_label">form_input</div></div>
                          </div>
                          <div className="form_field-wrapper">
                            <label htmlFor="field-alt-1" className="form_field-label is-alternate">.form_field-label</label>
                            <input className="form_input is-alternate" maxLength={256} name="field" placeholder=".form_input" type="text" id="field-alt-1" />
                          </div>
                        </div>
                        <div className="w-layout-grid rl-styleguide_item-row">
                          <div className="class-label-column">
                            <div className="class-label-row">
                              <div className="rl-styleguide_label">form_input</div>
                              <div className="rl-styleguide_label">is-text-area</div>
                            </div>
                          </div>
                          <div className="form_field-wrapper">
                            <label htmlFor="field-alt-2" className="form_field-label is-alternate">.form_field-label</label>
                            <textarea name="Field" maxLength={5000} id="field-alt-2" placeholder=".form_input.textarea" className="form_input is-text-area is-alternate"></textarea>
                          </div>
                        </div>
                        <div className="w-layout-grid rl-styleguide_item-row">
                          <div className="class-label-column">
                            <div className="class-label-row">
                              <div className="rl-styleguide_label">form_input</div>
                              <div className="rl-styleguide_label">is-select-input</div>
                            </div>
                          </div>
                          <div className="form_field-wrapper">
                            <label htmlFor="field-alt-3" className="form_field-label is-alternate">.form_field-label</label>
                            <select id="field-alt-3" name="Field" className="form_input is-select-input is-alternate">
                              <option value="">Select one...</option>
                              <option value="First">First Choice</option>
                              <option value="Second">Second Choice</option>
                              <option value="Third">Third Choice</option>
                            </select>
                          </div>
                        </div>
                        <div className="w-layout-grid rl-styleguide_item-row">
                          <div className="class-label-column">
                            <div className="class-label-row"><div className="rl-styleguide_label">form_checkbox</div></div>
                          </div>
                          <label className="form_checkbox is-alternate">
                            <div className="form_checkbox-icon is-alternate"></div>
                            <span className="form_checkbox-label">Checkbox</span>
                          </label>
                        </div>
                        <div className="w-layout-grid rl-styleguide_item-row">
                          <div className="class-label-column">
                            <div className="class-label-row"><div className="rl-styleguide_label">form_radio</div></div>
                          </div>
                          <label className="form_radio is-alternate">
                            <div className="form_radio-icon is-alternate"></div>
                            <span className="form_radio-label">Radio</span>
                          </label>
                        </div>
                        <div className="w-layout-grid rl-styleguide_item-row">
                          <div className="class-label-column">
                            <div className="class-label-row"><div className="rl-styleguide_label">button</div></div>
                          </div>
                          <input type="submit" className="button is-alternate" value="Submit" />
                        </div>
                      </form>
                      <div className="form_message-success">
                        <div>Thank you! Your submission has been received!</div>
                      </div>
                      <div className="form_message-error">
                        <div>Oops! Something went wrong while submitting the form.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Icons (HTML Embed) */}
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">
                    Icons (HTML Embed)<br /><span className="rl-styleguide_subheading-small">HTML embed icons enable you to control icon color on hover.</span>
                  </div>
                  <div className="rl-styleguide_icons-list">
                    {["xxsmall", "xsmall", "small", "medium", "large", "xlarge", "custom1"].map((size) => (
                      <div key={size} className="rl-styleguide_item">
                        <p className="rl-styleguide_label">icon-embed-{size}</p>
                        <div className={`icon-embed-${size}`}><CubeIcon /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ======== RADIUS ======== */}
              <div id="radius" className="rl-styleguide_borders">
                <div className="rl-styleguide_heading">Radius</div>
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">Large<br /><span className="rl-styleguide_subheading-small">Large radius is applied to elements which are 1 or 2 columns in width.</span></div>
                  <div className="w-layout-grid rl-styleguide_radius-large-list">
                    <div className="rl-styleguide_radius-large"></div>
                    <div className="rl-styleguide_radius-large"></div>
                  </div>
                </div>
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">Medium<br /><span className="rl-styleguide_subheading-small">Medium radius is applied to elements which are between 2 and 3 columns in width.</span></div>
                  <div className="w-layout-grid rl-styleguide_radius-medium-list">
                    <div className="rl-styleguide_radius-medium"></div>
                    <div className="rl-styleguide_radius-medium"></div>
                    <div className="rl-styleguide_radius-medium"></div>
                  </div>
                </div>
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">Small<br /><span className="rl-styleguide_subheading-small">Small radius is applied to elements which are smaller than 4 columns in width.</span></div>
                  <div className="w-layout-grid rl-styleguide_radius-small-list">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="rl-styleguide_radius-small"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ======== EFFECTS ======== */}
              <div id="effects" className="rl-styleguide_effects">
                <div className="rl-styleguide_heading">Effects</div>
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">Box Shadows<br /><span className="rl-styleguide_subheading-small">Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.</span></div>
                  <div className="w-layout-grid rl-styleguide_shadows-list">
                    {["xxsmall", "xsmall", "small", "medium", "large", "xlarge", "xxlarge"].map((size) => (
                      <div key={size} className={`shadow-${size}`}>
                        <div className="rl-styleguide_label">shadow-{size}</div>
                        <div className="rl-styleguide_empty-space"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ======== STRUCTURE CLASSES ======== */}
            <div className="rl-styleguide_classes">
              <div id="structure-classes" className="rl-styleguide_structure">
                <div className="rl-styleguide_heading">Structure Classes</div>
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading is-text-small">
                    <span>Defined and flexible core structure we can use on all or most pages.</span>
                  </div>
                  <div className="w-layout-grid rl-styleguide_item">
                    <div className="rl-styleguide_label">page-wrapper</div>
                    <div className="page-wrapper"><div className="rl-styleguide_empty-box pointer-events-off"></div></div>
                  </div>
                  <div className="w-layout-grid rl-styleguide_item">
                    <div className="rl-styleguide_label">main-wrapper</div>
                    <div className="main-wrapper"><div className="rl-styleguide_empty-box"></div></div>
                  </div>
                  {["container-small", "container-medium", "container-large"].map((cls) => (
                    <div key={cls} className="w-layout-grid rl-styleguide_item">
                      <div className="rl-styleguide_label">{cls}</div>
                      <div className={cls}><div className="rl-styleguide_empty-box"></div></div>
                    </div>
                  ))}
                  <div className="w-layout-grid rl-styleguide_item is-stretch">
                    <div className="rl-styleguide_label">padding-global</div>
                    <div className="padding-global"><div className="rl-styleguide_empty-box"></div></div>
                  </div>
                  {["padding-section-small", "padding-section-medium", "padding-section-large"].map((cls) => (
                    <div key={cls} className="w-layout-grid rl-styleguide_item is-stretch">
                      <div className="rl-styleguide_label">{cls}</div>
                      <div className="rl-styleguide_spacing">
                        <div className={cls}><div className="rl-styleguide_empty-box"></div></div>
                      </div>
                    </div>
                  ))}
                  <div className="w-layout-grid rl-styleguide_item">
                    <div className="rl-styleguide_label">button-group</div>
                    <div className="button-group">
                      <div className="rl-styleguide_empty-box"></div>
                      <div className="rl-styleguide_empty-box"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Max Widths */}
              <div className="rl-styleguide_max-width">
                <div className="rl-styleguide_heading">Max Widths</div>
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading is-text-small">Use the max-width CSS property to contain inner content to a maximum width.</div>
                  {[
                    "max-width-full",
                    "max-width-full-tablet",
                    "max-width-full-mobile-landscape",
                    "max-width-full-mobile-portrait",
                    "max-width-xxlarge",
                    "max-width-xlarge",
                    "max-width-large",
                    "max-width-medium",
                    "max-width-small",
                    "max-width-xsmall",
                    "max-width-xxsmall",
                  ].map((cls) => (
                    <div key={cls} className="w-layout-grid rl-styleguide_item is-stretch">
                      <div className="rl-styleguide_label">{cls}</div>
                      <div className={cls}><div className="rl-styleguide_empty-box"></div></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Paddings */}
              <div className="rl-styleguide_paddings">
                <div className="rl-styleguide_heading">Paddings</div>
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">Direction Classes</div>
                  {["padding-bottom", "padding-top", "padding-vertical", "padding-horizontal", "padding-left", "padding-right"].map((cls) => (
                    <div key={cls} className="w-layout-grid rl-styleguide_item is-stretch">
                      <div className="rl-styleguide_label">{cls}</div>
                      <div className={cls}><div className="rl-styleguide_empty-box"></div></div>
                    </div>
                  ))}
                </div>
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">Size Classes</div>
                  {[
                    "padding-0", "padding-tiny", "padding-xxsmall", "padding-xsmall",
                    "padding-small", "padding-medium", "padding-large", "padding-xlarge",
                    "padding-xxlarge", "padding-huge", "padding-xhuge", "padding-xxhuge",
                    "padding-custom1", "padding-custom2", "padding-custom3",
                  ].map((cls) => (
                    <SpacingItem key={cls} label={cls} className={cls} />
                  ))}
                </div>
              </div>

              {/* Margins */}
              <div className="rl-styleguide_margins">
                <div className="rl-styleguide_heading">Margins</div>
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">Direction Classes</div>
                  {["margin-bottom", "margin-top", "margin-vertical", "margin-horizontal", "margin-left", "margin-right"].map((cls) => (
                    <div key={cls} className="w-layout-grid rl-styleguide_item is-stretch">
                      <div className="rl-styleguide_label">{cls}</div>
                      <div className={cls}><div className="rl-styleguide_empty-box"></div></div>
                    </div>
                  ))}
                </div>
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">Size Classes</div>
                  {[
                    "margin-0", "margin-tiny", "margin-xxsmall", "margin-xsmall",
                    "margin-small", "margin-medium", "margin-large", "margin-xlarge",
                    "margin-xxlarge", "margin-huge", "margin-xhuge", "margin-xxhuge",
                    "margin-custom1", "margin-custom2", "margin-custom3",
                  ].map((cls) => (
                    <SpacingItem key={cls} label={cls} className={cls} />
                  ))}
                </div>
              </div>

              {/* Spacers */}
              <div className="rl-styleguide_spacers">
                <div className="rl-styleguide_heading">Spacers</div>
                <div className="w-layout-grid rl-styleguide_list">
                  <div className="rl-styleguide_subheading">Unified spacer system for the project.</div>
                  {[
                    "spacer-tiny", "spacer-xxsmall", "spacer-xsmall", "spacer-small",
                    "spacer-medium", "spacer-large", "spacer-xlarge", "spacer-xxlarge",
                    "spacer-huge", "spacer-xhuge", "spacer-xxhuge",
                  ].map((cls) => (
                    <SpacingItem key={cls} label={cls} className={cls} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
