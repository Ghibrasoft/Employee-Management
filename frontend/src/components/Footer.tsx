export function Footer() {
    return (
        <div className="bg-white flex justify-between border-t-2">
            {/* contact */}
            <div className="">
                <h1>Contact</h1>
                <ul>
                    <li>
                        LinkedIn:
                        <a href="http://">linkedin link</a>
                    </li>
                    <li>Gmail: myemail@gmail.com</li>
                    <li>Phone: +(XXX) XXX XXX XXX</li>
                </ul>
            </div>

            {/* projects */}
            <div className="">
                <p>Projects</p>
                <a href="http://">github link</a>
            </div>

            {/* creator */}
            <div>&copy; Created by Ghibrasoft.</div>
        </div>
    )
}
