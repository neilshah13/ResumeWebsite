import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { email } from '@config';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    color: var(--slate);
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .text_1 {
    animation: text1;
  }
  .text_2 {
    animation: text2;
  }
  .text_3 {
    animation: text3;
  }
  
  .text_1, .text_2, .text_3 {
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    position: relative;
    animation-duration: 12s;
    animation-timing-function: steps(50, end);
    animation-iteration-count: infinite;
  }
  .text_1::after, .text_2::after, .text_3::after {
    content: "|";
    position: absolute;
    right: 1;
    animation: caret infinite;
    animation-duration: 1s;
    animation-timing-function: steps(1, end);
  }

  @keyframes caret {
    0%, 100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes text3 {
    0%, 10%, 30%, 40%, 50%, 60%, 70%, 100% {
      width: 0;
    }
    
    90% {
      width: 9.5em;
    }
  }
  @keyframes text1 {
    0%, 40%, 50%, 60%, 70%, 90%, 100% {
      width: 0;
    }
    30% {
      width: 9.5em;
    }
  }
  @keyframes text2 {
    0%, 10%, 30%, 50%, 70%, 90%, 100% {
      width: 0;
    }
    60% {
      width: 7.5em;
    }
  }

`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Neil Shah</h2>;
  const three = <h3 className="big-heading">
                <span class="text_1">Product Manager.</span>
                <span class="text_2">Data Scientist.</span>
                <span class="text_3">Software Engineer.</span>
                </h3>;
  const four = (
    <p>
      I'm a Business Analytics graduate from 
      {''} <a href="https://www.nus.edu.sg/" target="_blank" rel="noreferrer">National Univeristy of Singapore </a>
      and am currently working as a Product Manager at {''} <a href="https://www.workato.com/" target="_blank" rel="noreferrer">Workato</a>. 
      I'm also data scientist and data analyst having worked in the E-commerce industry.
      I also love dabbling in software engineering and looking into Web3 Products. 
      I have interned at {''} <a href="https://shopee.sg/" target="_blank" rel="noreferrer">Shopee</a>, 
      {''} <a href="https://www.carousell.sg/" target="_blank" rel="noreferrer">Carousell</a>, 
      {''} <a href="https://www.visenze.com/" target="_blank" rel="noreferrer">Visenze</a> and more.
    </p>
  );
  const five = (
    <a href={`mailto:${email}`} className="email-link">
      Get In Touch
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
