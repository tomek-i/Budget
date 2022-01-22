import React, { useRef, useEffect, useContext } from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';

type TransitionState = {
  parent: {
    appear?: boolean;
    show?: boolean;
    isInitialRender?: boolean;
  };
};
const TransitionContext = React.createContext<TransitionState>({
  parent: {
    appear: false,
    show: false,
    isInitialRender: false,
  },
});

function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}
export type CSSTransitionProps = {
  show?: any;
  enter?: string;
  enterStart?: string;
  enterEnd?: string;
  leave?: string;
  leaveStart?: string;
  leaveEnd?: string;
  appear?: any;
  unmountOnExit?: any;
  tag?: 'div';
};
export const CSSTransition: React.FC<CSSTransitionProps> = ({
  show,
  enter = '',
  enterStart = '',
  enterEnd = '',
  leave = '',
  leaveStart = '',
  leaveEnd = '',
  appear,
  unmountOnExit,
  tag = 'div',
  children,
  ...rest
}) => {
  const enterClasses = enter.split(' ').filter((s) => s.length);
  const enterStartClasses = enterStart.split(' ').filter((s) => s.length);
  const enterEndClasses = enterEnd.split(' ').filter((s) => s.length);
  const leaveClasses = leave.split(' ').filter((s) => s.length);
  const leaveStartClasses = leaveStart.split(' ').filter((s) => s.length);
  const leaveEndClasses = leaveEnd.split(' ').filter((s) => s.length);
  const removeFromDom = unmountOnExit;

  function addClasses(node: any, classes: any) {
    classes.length && node.classList.add(...classes);
  }

  function removeClasses(node: any, classes: any) {
    classes.length && node.classList.remove(...classes);
  }

  const nodeRef: any = React.useRef(null);
  const Component = tag;

  return (
    <ReactCSSTransition
      appear={appear}
      nodeRef={nodeRef}
      unmountOnExit={removeFromDom}
      in={show}
      addEndListener={(done: any) => {
        nodeRef.current.addEventListener('transitionend', done, false);
      }}
      onEnter={() => {
        if (!removeFromDom) nodeRef.current.style.display = null;
        addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses]);
      }}
      onEntering={() => {
        removeClasses(nodeRef.current, enterStartClasses);
        addClasses(nodeRef.current, enterEndClasses);
      }}
      onEntered={() => {
        removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses]);
      }}
      onExit={() => {
        addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses]);
      }}
      onExiting={() => {
        removeClasses(nodeRef.current, leaveStartClasses);
        addClasses(nodeRef.current, leaveEndClasses);
      }}
      onExited={() => {
        removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses]);
        if (!removeFromDom) nodeRef.current.style.display = 'none';
      }}
    >
      <div
        ref={nodeRef}
        {...rest}
        style={{ display: !removeFromDom ? 'none' : undefined }}
      >
        {children}
      </div>
      {/* <Component
        ref={nodeRef}
        {...rest}
        style={{ display: !removeFromDom ? 'none' : null }}
      >
        {children}
      </Component> */}
    </ReactCSSTransition>
  );
};
type TransitionProps = {
  show?: boolean;
  appear?: boolean;
  className?: string;
  enter?: string;
  enterStart?: string;
  enterEnd?: string;
  leave?: string;
  leaveStart?: string;
  leaveEnd?: string;
};
export const Transition: React.FC<TransitionProps> = ({
  show,
  appear,
  ...rest
}) => {
  const { parent } = useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  if (isChild) {
    return (
      <CSSTransition
        appear={parent.appear || !parent.isInitialRender}
        show={parent.show}
        {...rest}
      />
    );
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
        },
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  );
};

export default Transition;
