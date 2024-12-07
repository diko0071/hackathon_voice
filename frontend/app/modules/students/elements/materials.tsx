"use client"

import { ChevronRight } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TeacherAvatar } from './avatar'

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      {children}
    </section>
  )
}

export function ReadMaterials() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          <h2 className="text-2xl font-bold mb-6">React Fundamentals</h2>
          <div className="space-y-6">
            <Section title="1. Introduction to React">
              <p>React is a JavaScript library for building user interfaces. It was developed by Facebook and has become one of the most popular front-end libraries in recent years.</p>
              <p>Key features of React include:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Component-based architecture</li>
                <li>Virtual DOM for efficient updates</li>
                <li>Declarative syntax</li>
                <li>Unidirectional data flow</li>
              </ul>
            </Section>
            <Section title="2. Components and Props">
              <p>Components are the building blocks of React applications. They are reusable pieces of code that return React elements to be rendered on the screen.</p>
              <p>Props (short for properties) are a way to pass data from parent to child components. They are read-only and help keep components pure.</p>
              <pre className="bg-muted p-4 rounded-md mt-2 text-sm">
                {`function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}`}
              </pre>
            </Section>
            <Section title="3. State and Lifecycle">
              <p>State is a JavaScript object that stores data that may change over time. When state changes, React re-renders the component.</p>
              <p>Lifecycle methods are special methods that run at different stages of a component's life, such as when it's mounted, updated, or unmounted.</p>
              <pre className="bg-muted p-4 rounded-md mt-2 text-sm">
                {`class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}`}
              </pre>
            </Section>
            <Section title="4. Handling Events">
              <p>React events are named using camelCase and passed as functions. They are similar to handling events in regular JavaScript, but with some syntax differences.</p>
              <pre className="bg-muted p-4 rounded-md mt-2 text-sm">
                {`<button onClick={handleClick}>
  Click me
</button>`}
              </pre>
            </Section>
            <Section title="5. Conditional Rendering">
              <p>In React, you can create distinct components that encapsulate behavior you need. Then, you can render only some of them, depending on the state of your application.</p>
              <pre className="bg-muted p-4 rounded-md mt-2 text-sm">
                {`function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}`}
              </pre>
            </Section>
          </div>
        </ScrollArea>
      </div>
      <div className="lg:col-span-1">
        <TeacherAvatar />
      </div>
    </div>
  )
}