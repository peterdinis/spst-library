"use client"

import React, { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string | null;
}

class GlobalBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    const { hasError, errorMessage } = this.state;

    if (hasError) {
      return (
        <main className="h-screen w-full flex flex-col justify-center items-center">
          <h1 className="text-9xl font-extrabold text-black tracking-widest">
            Chyba
          </h1>
          <div className="mt-5">
            <button
              onClick={() => this.setState({ hasError: false })}
              className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
            >
              <span className="pt-12 absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 text-black font-bold text-xl group-hover:translate-y-0 group-hover:translate-x-0">
                {errorMessage}
              </span>

              <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                Refreshnúť stránku
              </span>
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default GlobalBoundary