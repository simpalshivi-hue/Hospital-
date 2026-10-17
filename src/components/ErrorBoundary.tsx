import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Shubhdeep Hospital App Runtime Error:', error, errorInfo);
  }

  public handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          backgroundColor: '#020617',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '520px',
            width: '100%',
            backgroundColor: '#0f172a',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '24px',
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '28px'
            }}>
              🏥
            </div>

            <h1 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px', color: '#ffffff' }}>
              शुभदीप हॉस्पिटल (SHUBHDEEP HOSPITAL)
            </h1>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 20px', lineHeight: 1.5 }}>
              एप्लिकेशन लोड करने में अस्थायी समस्या आई। कृपया पेज को पुनः लोड करें अथवा सीधे संपर्क करें।
            </p>

            {this.state.error && (
              <div style={{
                backgroundColor: '#1e293b',
                padding: '12px',
                borderRadius: '12px',
                fontSize: '12px',
                color: '#f87171',
                textAlign: 'left',
                marginBottom: '20px',
                overflowX: 'auto',
                fontFamily: 'monospace'
              }}>
                {this.state.error.message}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleReload}
                style={{
                  padding: '10px 20px',
                  borderRadius: '12px',
                  backgroundColor: '#0d9488',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                🔄 Reload Page (पेज रिफ्रेश करें)
              </button>

              <a
                href="tel:09555254042"
                style={{
                  padding: '10px 20px',
                  borderRadius: '12px',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                📞 Call: 095552 54042
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
