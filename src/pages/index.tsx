import React from 'react'
import Layout from '../components/Layout'
import { work, projects } from '../data'
import SEO from '../components/SEO'
import { Link } from 'gatsby'

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <Layout>
      <header className="text-3xl font-light">
        Hi there! I'm Rickard Laurin, a developer from Sweden. I enjoy making
        user-friendly websites and creating tools that make life easier for
        other developers. I currently love working in{' '}
        <a
          className="link"
          href="https://reasonml.github.io/"
          rel="noopener noreferrer"
          target="_blank"
        >
          ReasonML
        </a>
        .
      </header>

      <section className="flex items-center mt-10">
        <a
          className="flex items-center mr-8"
          href="https://github.com/believer"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 ml-2"
          >
            <path d="M19.5 11V21.5H2.5V4.5H13" stroke="#1A202C" />
            <path
              d="M7.5 16.5L21.5 2.5"
              stroke="#1A202C"
              strokeLinecap="round"
            />
            <path d="M15 2.5H21.5V9" stroke="#1A202C" />
          </svg>
        </a>
        <a
          className="flex items-center"
          href="https://www.linkedin.com/in/rickardlaurin/"
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 ml-2"
          >
            <path d="M19.5 11V21.5H2.5V4.5H13" stroke="#1A202C" />
            <path
              d="M7.5 16.5L21.5 2.5"
              stroke="#1A202C"
              strokeLinecap="round"
            />
            <path d="M15 2.5H21.5V9" stroke="#1A202C" />
          </svg>
        </a>
      </section>

      <section className="mt-10">
        <header className="pb-4 mb-4 border-b border-gray-300">
          Experience
        </header>
        <ul className="mb-6">
          {work.map(w => (
            <li className="mb-10 last:mb-0 list-item" key={w.id}>
              <h2 className="text-lg font-normal text-gray-900 mb-2">
                {w.name}
              </h2>
              <div className="text-sm text-gray-500 mb-2">
                {w.position} ~ {w.start} - {w.end}
              </div>
              <div dangerouslySetInnerHTML={{ __html: w.description }}></div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <header className="pb-4 mb-4 border-b border-gray-300">Projects</header>
        <ul>
          {projects.map(p => (
            <li className="mb-8 last:mb-0 list-item" key={p.id}>
              <div className="flex items-center">
                <div className="flex-1 mr-5">
                  <h2 className="text-lg font-normal text-gray-900 mb-2">
                    {p.name}
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: p.description }}
                  ></div>
                </div>
                <a href={p.link}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path d="M19.5 11V21.5H2.5V4.5H13" stroke="#1A202C" />
                    <path
                      d="M7.5 16.5L21.5 2.5"
                      stroke="#1A202C"
                      strokeLinecap="round"
                    />
                    <path d="M15 2.5H21.5V9" stroke="#1A202C" />
                  </svg>
                </a>
              </div>
              <div className="mt-4 flex flex-wrap">
                {p.tech.map(t => (
                  <div
                    className="text-xs bg-gray rounded-full px-3 py-1 bg-blue-100 text-blue-700 mr-2 mb-2 sm:mb-0 last:mr-0"
                    key={t}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  </>
)

export default IndexPage
