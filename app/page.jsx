'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import MapDropdown from '@/components/MapDropdown';
import Modal from '@/components/Modal';
import LoginButton from '@/components/LoginButton';

export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="App">
            {/* Banner */}
            <div className="banner">
                <div className="left-section">
                    <a href="https://www.ubisoft.com/en-us/game/rainbow-six/siege" target="_blank" rel="noreferrer">
                        <img src="/images/logo.jpg" alt="Logo" className="logo" />
                    </a>
                </div>

                <div className="middle-section">
                    <img src="/images/logo2.png" alt="Logo 2" className="second-logo" />
                </div>

                <div className="right-section">
                    <span className="tab">
                        <LoginButton />
                    </span>
                    <span className="tab">
                        <a href="https://www.youtube.com/@nolmanofficial" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faYoutube} className="youtube-icon" />
                        </a>
                    </span>
                    <span className="tab">
                        <a href="https://github.com/NolanBerg/SiegeSpawnPeeks.NET" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faGithub} className="github-icon" />
                        </a>
                    </span>
                    <span className="tab">
                        <a href="mailto:nolanreactdev@gmail.com" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" />
                        </a>
                    </span>
                </div>
            </div>

            {/* Divider */}
            <div className="banner2"></div>

            {/* Main Content */}
            <div className="banner3">
                <MapDropdown />
            </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>About Us</h2>
                <p>
                    We provide spawn peeks for players ranging from the casual level to pros. If you have any spawn peeks
                    not on the site, click the mail icon and send them to me!
                </p>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
}
