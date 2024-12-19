import React from 'react';
import { analytics } from '../utils/analytics';

interface TrackingConfig {
  category: string;
  events?: {
    [key: string]: {
      action: string;
      label?: string;
      getValue?: (...args: any[]) => number;
    };
  };
}

export function withTracking<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  config: TrackingConfig
) {
  return class WithTracking extends React.Component<P> {
    componentDidMount() {
      analytics.track({
        category: config.category,
        action: 'Mount'
      });
    }

    componentWillUnmount() {
      analytics.track({
        category: config.category,
        action: 'Unmount'
      });
    }

    trackEvent = (eventName: string, ...args: any[]) => {
      const eventConfig = config.events?.[eventName];
      if (eventConfig) {
        analytics.track({
          category: config.category,
          action: eventConfig.action,
          label: eventConfig.label,
          value: eventConfig.getValue?.(...args)
        });
      }
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          trackEvent={this.trackEvent}
        />
      );
    }
  };
} 