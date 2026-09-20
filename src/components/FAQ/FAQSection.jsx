import React, { useState } from 'react';
import './FAQSection.css';

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'كيف أختار العطر المناسب لشخصيتي والمناسبة؟',
    answer: 'لاختيار العطر المثالي، حدد أولاً وقت الاستخدام ونوع المناسبة؛ فالعطور الحمضية والزهرية الخفيفة تناسب أوقات الصباح والعمل وأجواء الصيف، بينما تُعد العطور الشرقية الخشبية وتوليفات العود والعنبر الخيار الأمثل للمساء والسهرات والمناسبات الرسمية والأجواء الباردة. كما يُنصح بتجربة العطر على نقاط النبض وملاحظة تطور النوتات وتفاعلها مع كيمياء بشرتك.',
  },
  {
    id: 'faq-2',
    question: 'ما هو الفرق بين ماء العطر (Eau de Parfum) وماء التواليت (Eau de Toilette)؟',
    answer: 'يكمن الفرق الأساسي في نسبة تركيز الزيوت العطرية النقية؛ حيث يحتوي ماء العطر (EDP) على تركيز يتراوح بين 15% إلى 20%، مما يمنحه ثباتاً عالياً يدوم حتى 12 ساعة وفوحاناً غنياً. في المقابل، يحتوي ماء التواليت (EDT) على تركيز بين 5% إلى 15%، مما يجعله أكثر انتعاشاً ومناسباً للاستخدام اليومي الخفيف وتجديده على مدار اليوم.',
  },
  {
    id: 'faq-3',
    question: 'كيف أحافظ على ثبات العطر وجودته لأطول فترة ممكنة؟',
    answer: 'لحفظ العطر بأعلى جودة، ضعه في مكان جاف وبارد بعيداً عن أشعة الشمس المباشرة والحرارة والرطوبة العالية. وللحصول على أقصى ثبات، قم بترطيب بشرتك قبل الرش وركز على نقاط النبض (الرقبة، المعصمين، وخلف الأذنين)، وتجنب فرك المعصمين معاً حتى لا تتكسر جزيئات النوتات العليا.',
  },
  {
    id: 'faq-4',
    question: 'هل جميع عطور متجر "رشة عطر" أصلية ومضمونة؟',
    answer: 'نعم، نلتزم في متجر رشة عطر بتقديم عطور أصلية وفاخرة 100% مصنوعة من أجود الزيوت العطرية العالمية وبأعلى درجات النقاء والثبات، مع توفير سياسة استرجاع واستبدال مرنة لضمان راحة وثقة عملائنا في السعودية ومصر.',
  },
  {
    id: 'faq-5',
    question: 'كم تستغرق مدة الشحن وتوصيل الطلبات؟',
    answer: 'يتم تجهيز وشحن الطلبات عبر شركات شحن موثوقة خلال 2 إلى 4 أيام عمل لجميع المناطق والمدن، وتصلك الشحنة في تغليف آمن وفاخر يحفظ سلامة الزجاجات العطرية.',
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Schema.org FAQPage JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="faq-section" id="faq" dir="rtl">
      {/* Injected FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="faq-container">
        <div className="faq-header">
          <span className="faq-badge">مركز الإرشادات والمعلومات</span>
          <h2 className="faq-title">الأسئلة الشائعة</h2>
          <div className="faq-title-underline"></div>
          <p className="faq-subtitle">
            كل ما يهمك معرفته حول اختيار عطرك المثالي، سر الثبات الفائق، وتوصيل طلبك بكل عناية
          </p>
        </div>

        <div className="faq-accordion">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className={`faq-icon-toggle ${isOpen ? 'rotated' : ''}`}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="faq-chevron"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  className={`faq-answer-wrapper ${isOpen ? 'open' : ''}`}
                >
                  <div className="faq-answer-inner">
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
