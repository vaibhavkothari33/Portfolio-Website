import React from 'react'
import type { Metadata } from "next";
import "@/components/ui/button.css";

/**
 * Three buttons pointing at two PDFs, with no inbound link from anywhere on
 * the site. Indexing it would spend crawl budget on a thin page that competes
 * with the pages that should rank, so it's kept out of the index while
 * staying reachable to anyone given the URL directly.
 */
export const metadata: Metadata = {
  title: "Company Wise Resume",
  robots: { index: false, follow: true },
};

function page() {
    return (
        <div className='bg-canvas text-strong'>
            <h1 className='text-4xl font-bold text-center text-strong'>Company Wise Resume of Vaibhav Kothari</h1>
            <div className='flex justify-center items-center my-10'>
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
        </div>
    )
}

export default page