import React, { useEffect } from 'react';

const ParticleBackground = () => {
    useEffect(() => {
        if (window.particlesJS) {
            console.log('particlesJS is available');
            window.particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 50,
                        density: {
                            enable: true,
                            value_area: 800,
                        },
                    },
                    color: {
                        value: ['#313260', '#b02915', '#016530'],  // Red color
                    },
                    size: {
                        value: 3,
                    },
                    move: {
                        speed: 1,
                    },
                    opacity: {
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                        },
                    },
                },
                interactivity: {
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'repulse',
                        },
                    },
                    modes: {
                        repulse: {
                            distance: 100,
                            duration: 0.4,
                        },
                    },
                },
            });
        } else {
            console.log('particlesJS is not available');
        }
    }, []);

    return <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}></div>;
};

export default ParticleBackground;
