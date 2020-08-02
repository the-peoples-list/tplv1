import React  from 'react';
import './mainNav.scss';

function MainNav ({mobileNav, mobileNavOpen, setChosenView}){

		return (
				<div className={!mobileNav && mobileNavOpen === false ? "main-nav" : mobileNavOpen === true && mobileNav ? "main-nav__mobile" : "main-nav__mobile-hidden"}>
					<div className="main-nav__nav-item" onClick={() => setChosenView('tangibleBuild')}>
						<p className="main-nav__nav-item-title">Tangible Build</p>
						<p className="main-nav__nav-item-description">(coming soon)</p>
					</div>
					<div className="main-nav__nav-item" onClick={() => setChosenView('tangibleOccupy')}>
						<p className="main-nav__nav-item-title">Tangible Occupy</p>
					</div>
					<div className="main-nav__nav-item" onClick={() => setChosenView('digitalBuild')}>
						<p className="main-nav__nav-item-title">Digital Build</p>
						<p className="main-nav__nav-item-description">(coming soon)</p>
					</div>
					<div className="main-nav__nav-item" onClick={() => setChosenView('digitalOccupy')}>
						<p className="main-nav__nav-item-title">Digital Occupy</p>
						<p className="main-nav__nav-item-description">(coming soon)</p>
					</div>
					<div className="main-nav__nav-item" onClick={() => setChosenView('allViews')}>
						<p className="main-nav__nav-item-title">All of it</p>
						<p className="main-nav__nav-item-description">(coming soon)</p>
					</div>
					<div className="main-nav__nav-item" onClick={() => setChosenView('aboutTpl')}>
						<p className="main-nav__nav-item-title">About TPL</p>
						<p className="main-nav__nav-item-description">(coming soon)</p>
					</div>
				</div>
		);
}

export default MainNav;