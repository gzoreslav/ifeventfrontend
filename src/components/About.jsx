'use strict';

import React from 'react';

const About = () => (
  <div>
    <header>
        <div className="container">
            <div className="intro-text">
                <div className="intro-lead-in">Уже зовсім скоро!</div>
                <div className="intro-heading">Час спланувати вихідні</div>
                <a href="#services" className="page-scroll btn btn-xl">Дізнатися Більше</a>
            </div>
        </div>
    </header>

    <section id="services">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 className="section-heading">Можливості</h2>
                    <h3 className="section-subheading text-muted">Сайт-агрегатор всіх подій Івано-Франківська. Зручний пошук та фільтрація. Відображення подій з ваших обраних груп та сторінок.</h3>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="fa fa-search fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 className="service-heading">Пошук</h4>
                    <p className="text-muted">Зручний пошук по всіх подіях міста</p>
                </div>
                <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="fa fa-filter fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 className="service-heading">Фільтрація</h4>
                    <p className="text-muted">Фільтрування вибраних подій за ціною, часом, місцем проведення та іншими критеріями.</p>
                </div>
                <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="fa fa-user fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 className="service-heading">Персоналізація</h4>
                    <p className="text-muted">Відображення подій з усіх ваших обраних груп та сторінок</p>
                </div>
            </div>
        </div>
    </section>

    <section id="contact">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 className="section-heading">Зв'язатися з нами</h2>
                    <h3 className="section-subheading text-muted">Маєте запитання чи пропозиції? Напишіть нам на <a href="mailto:info@ifcityevent.com">info@ifcityevent.com</a></h3>
                </div>
            </div>
        </div>
    </section>
  </div>
);

export default About;
