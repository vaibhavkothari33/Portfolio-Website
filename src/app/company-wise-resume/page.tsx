import React from 'react'
import "@/components/ui/button.css";
function page() {
    return (
        <div>
            <a href="/salescodeai.pdf"
                target="_blank"
                className='m-10'
                rel="noopener noreferrer">
                <button className="button">
                    <span className="button_lg">
                        <span className="button_sl" />
                        <span className="button_text">
                            View SalesCodeAI Resume
                        </span>
                    </span>
                </button>
            </a>

            <a href="/resume.pdf"
                target="_blank"
                className='m-10'
                rel="noopener noreferrer">
                <button className="button">
                    <span className="button_lg">
                        <span className="button_sl" />
                        <span className="button_text">
                            View Resume
                        </span>
                    </span>
                </button>
            </a>
            <a href="/resume.pdf"
                target="_blank"
                className='m-10'
                rel="noopener noreferrer">
                <button className="button">
                    <span className="button_lg">
                        <span className="button_sl" />
                        <span className="button_text">
                            Normal Resume
                        </span>
                    </span>
                </button>
            </a>
        </div>
    )
}

export default page