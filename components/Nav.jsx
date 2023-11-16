'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
const Nav = () => {
	const isUserLoggedIn = true
	const [providers, setProviders] = useState(null)
	const [toggleDropDown, setToggleDropDown] = useState(false)

	useEffect(() => {
		const setProviders = async () => {
			const response = await getProviders()
			setProviders(response)
		}
		// setProviders()
	}, [])
	return (
		<nav className='flex-between w-full mb-16 pt-3'>
			<Link
				href='/'
				className='flex gap-2 flex-center'
			>
				<Image
					src='/assets/images/logo.svg'
					alt='Promptopia Logo'
					className='object-contain'
					width={30}
					height={30}
				/>
				<p className='logo_text'>Promptopia</p>
			</Link>
			{/* Desk-top navigation */}
			<div className='sm:flex hidden'>
				{isUserLoggedIn ? (
					<div className='flex gap-3 md:gap-5'>
						<Link
							href='/'
							className='black_btn'
						>
							Create-prompt
						</Link>
						<button
							type='button'
							onClick={signOut}
							className='outline_btn'
						>
							Sign Out
						</button>
						<Link href='/profile'>
							<Image
								src='/assets/images/logo.svg'
								alt='Profile'
								className='rounded-full'
								width={37}
								height={37}
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className='black_btn'
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
			{/* Mobile navigation */}
			<div className='sm:hidden flex relative'>
				{isUserLoggedIn ? (
					<div className='flex'>
						<Image
							src='/assets/images/logo.svg'
							alt='Profile'
							className='rounded-full'
							width={37}
							height={37}
							onClick={() => setToggleDropDown((prev) => !prev)}
						/>
						{toggleDropDown && (
							<div className='dropdown'>
								<Link
									href='/profile'
									className='dropdown_link'
									onClick={() => setToggleDropDown(false)}
								>
									My Profile
								</Link>
								<Link
									href='/create-prompt'
									className='dropdown_link'
									onClick={() => setToggleDropDown(false)}
								>
									Create Prompt
								</Link>
								<button
									type='button'
									className='mt-5 2-full black_btn'
									onClick={() => {
										setToggleDropDown(false)
										signOut()
									}}
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className='black_btn'
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	)
}

export default Nav
