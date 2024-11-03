// import './footer.scss';

const Footer = () => {
    return (
        <footer className="bg-pink-100 dark:bg-purple-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="/" className="flex items-center">
                            {/*<img src="/images/bubble-tea-logo.svg" className="h-12 me-3" alt="Bubble Tea Logo"/>*/}
                            <span className="self-center text-3xl font-bold text-purple-900 dark:text-pink-200">
                                BubblyTea</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-purple-900 uppercase dark:text-pink-200">Our Flavors</h2>
                            <ul className="text-purple-600 dark:text-pink-400 font-medium">
                                <li className="mb-4">
                                    <a href="/menu" className="hover:underline">Classic Milk Tea</a>
                                </li>
                                <li>
                                    <a href="/menu" className="hover:underline">Fruit Tea</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-purple-900 uppercase dark:text-pink-200">Connect with Us</h2>
                            <ul className="text-purple-600 dark:text-pink-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Instagram</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">Facebook</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-purple-900 uppercase dark:text-pink-200">Legal</h2>
                            <ul className="text-purple-600 dark:text-pink-400 font-medium">
                                <li className="mb-4">
                                    <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="/terms" className="hover:underline">Terms & Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-pink-200 sm:mx-auto dark:border-purple-700 lg:my-8"/>
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-purple-500 sm:text-center dark:text-pink-400">
                        © 2024 <a href="/" className="hover:underline">BubblyTea™</a>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <a href="#" className="text-purple-500 hover:text-purple-700 dark:hover:text-pink-200">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                {/* Custom Instagram Icon */}
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.331 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.331 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.331-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.331-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.332.013 7.052.072 5.695.134 4.418.389 3.312 1.493 2.208 2.598 1.953 3.875 1.892 5.232.833 8.23.833 15.77 1.892 18.768c.061 1.357.316 2.634 1.42 3.738 1.106 1.106 2.382 1.361 3.739 1.42 1.281.059 1.69.072 4.949.072s3.668-.013 4.948-.072c1.357-.061 2.634-.316 3.739-1.42 1.106-1.105 1.361-2.382 1.42-3.738.059-1.281.072-1.69.072-4.949s-.013-3.668-.072-4.948c-.061-1.357-.316-2.634-1.42-3.739C19.332.389 18.055.134 16.698.072 15.418.013 15.009 0 12 0zm0 5.838a6.163 6.163 0 1 0 0 12.326 6.163 6.163 0 0 0 0-12.326zm0 10.173a4.01 4.01 0 1 1 0-8.02 4.01 4.01 0 0 1 0 8.02zm6.406-10.646a1.44 1.44 0 1 1 0-2.88 1.44 1.44 0 0 1 0 2.88z"/>
                            </svg>
                        </a>
                        {/* Add more social media links following the same style */}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
