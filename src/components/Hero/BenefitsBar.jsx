import React from 'react';
import BenefitItem from './BenefitItem';
import './BenefitsBar.css';

export default function BenefitsBar() {
  const benefits = [
    {
      id: 1,
      title: 'ثبات يدوم طويلاً',
      desc: 'رشة علي يدوم معك',
      icon: '/icons/star-circle.svg',
    },
    {
      id: 2,
      title: 'شحن سريع',
      desc: 'توصيل خلال أيام',
      icon: '/icons/truck-delivery.svg',
    },
    {
      id: 3,
      title: 'دفع آمن',
      desc: 'خيارات دفع متعددة',
      icon: '/icons/security-check.svg',
    },
    {
      id: 4,
      title: 'شحن مجاني للطلبات',
      desc: 'فوق 199 ريال',
      icon: '/icons/gift.svg',
    },
  ];

  return (
    <div className="benefits-floating-wrapper">
      <div className="benefits-card">
        {benefits.map((item, index) => (
          <React.Fragment key={item.id}>
            <BenefitItem
              icon={item.icon}
              title={item.title}
              desc={item.desc}
            />
            {index < benefits.length - 1 && <div className="benefit-divider" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
