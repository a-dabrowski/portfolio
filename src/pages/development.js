import Layout from '../components/layout';
import SEO from '../components/seo';

import React from 'react';
import Project from '../components/project';

import AboutIcon from '../../content/assets/svg/account.svg';
import ProjectsIcon from '../../content/assets/svg/projects.svg';
import TechnologyIcon from '../../content/assets/svg/computer.svg';

import ProjectsJSON from '../../content/development/projects.json';
import StackJSON from '../../content/development/stack.json';

import Author from '../assets/images/adam.jpg';

const links = [
  {
    name: 'about',
    icon: <AboutIcon />,
  },
  {
    name: 'projects',
    icon: <ProjectsIcon />,
  },
  {
    name: 'technologies',
    icon: <TechnologyIcon />,
  },
];

const Technology = (props) => (
  <div className="carousel__item">
    <h4>{props.name}</h4>
    <svg viewBox="0 0 128 128">
      <path d={props.path} fill={props.fill || ''} />
    </svg>
  </div>
);

const PhotographyIndex = ({ data, location }) => {
  return (
    <Layout location={location} title="Development">
      <SEO title="Development section" />
      <div>
        <header className="header">
          <h2 className="title--main" id="about">
            Hello, my name is Adam Dabrowski
          </h2>

          <p className="header__paragraph">
            <img className="header__image" src={Author} alt="Adam Dabrowski" />
            I'm a self-taught developer, currently working @DaftCode in Warsaw,
            Poland. I've been learning Front-End technologies from FreeCodeCamp,
            books and tutorials provided by Udemy and Codecademy. Before working
            full-time @DaftCode, I've been working on projects from FreeCodeCamp
            curriculum and ideas I've come up with myself, which I still work on
            in my spare time (my current personal side project is stock prices
            scraper).
          </p>
          <p className="header__paragraph">
            I'm a huge fan JavaScript and every technology surrounding it
            (frameworks, NodeJS etc.). So far I was able to improve my workflow
            with it and automate some repetitive tasks, which saves time for me
            and my colleagues. To check my repositories, go to my{' '}
            <a href="https://github.com/a-dabrowski">Github</a> account.
          </p>
          <p className="header__paragraph">
            I love putting my skills to test in real life projects where I can
            work with a team of developers building useful, great projects that
            help users achieve their goals.
          </p>
          <p className="header__paragraph">
            In my spare time I take photographs (you can check my{' '}
            <a href="https://www.instagram.com/adam_dabrowski/">Instagram</a>{' '}
            and <a href="https://500px.com/adamdabrowski">500PX</a> feed), ride
            a bike and keep me and my plants hydrated :)
          </p>
        </header>
        <main>
          <section id="projects">
            <h2 className="title">
              Here are some of the projects I've finished so far
            </h2>
            <ul className="list">
              {ProjectsJSON.projects.map((el) => (
                <Project data={el} />
              ))}
            </ul>
          </section>
          <section id="technologies">
            <h2 className="title">Technologies I've worked with</h2>
            <ul className="carousel">
              {StackJSON.stack.map((el) => (
                <li>
                  <Technology
                    name={el.name}
                    fill={el.fill}
                    path={el.path}
                    description={el.description}
                  />
                </li>
              ))}
            </ul>
          </section>
          <footer>
            <h6>Build with React by Adam Dabrowski</h6>
          </footer>
        </main>
      </div>
    </Layout>
  );
};
export default PhotographyIndex;
