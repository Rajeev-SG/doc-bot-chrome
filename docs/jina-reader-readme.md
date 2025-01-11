# Reader

Your LLMs deserve better input.

Reader does two things:

- **Read**: It converts any URL to an **LLM-friendly** input with `https://r.jina.ai/https://your.url`. Get improved output for your agent and RAG systems at no cost.
- **Search**: It searches the web for a given query with `https://s.jina.ai/your+query`. This allows your LLMs to access the latest world knowledge from the web.

Check out [the live demo](https://jina.ai/reader#demo)

Or just visit these URLs (**Read**) https://r.jina.ai/https://github.com/jina-ai/reader, (**Search**) https://s.jina.ai/Who%20will%20win%202024%20US%20presidential%20election%3F and see yourself.

> Feel free to use Reader API in production. It is free, stable and scalable. We are maintaining it actively as one of the core products of Jina AI. [Check out rate limit](https://jina.ai/reader#pricing)

## Updates

- **2024-10-08**: Introduced an `adaptive crawler`. It can recursively crawl the website and extract the most relevant pages for a given webpage.
- **2024-07-15**: To restrict the results of `s.jina.ai` to certain domain/website, you can set e.g. `site=jina.ai` in the query parameters, which enables in-site search. For more options, [try our updated live-demo](https://jina.ai/reader/#apiform).
- **2024-07-01**: We have resolved a DDoS attack and other traffic abusing since June 27th. We also found a bug introduced on June 28th which may cause higher latency for some websites. The attack and the bug have been solved; if you have experienced high latency of r.jina.ai between June 27th-30th, it should back to normal now.
- **2024-05-30**: Reader can now read abitrary PDF from any URL! Check out [this PDF result from NASA.gov](https://r.jina.ai/https://www.nasa.gov/wp-content/uploads/2023/01/55583main_vision_space_exploration2.pdf) vs [the original](https://www.nasa.gov/wp-content/uploads/2023/01/55583main_vision_space_exploration2.pdf).
- **2024-05-15**: We introduced a new endpoint `s.jina.ai` that searches on the web and return top-5 results, each in a LLM-friendly format. [Read more about this new feature here](https://jina.ai/news/jina-reader-for-search-grounding-to-improve-factuality-of-llms).
- **2024-05-08**: Image caption is off by default for better latency. To turn it on, set `x-with-generated-alt: true` in the request header.
- **2024-05-03**: We finally resolved a DDoS attack since April 29th. Now our API is much more reliable and scalable than ever!
- **2024-04-24**: You now have more fine-grained control over Reader API [using headers](#using-request-headers), e.g. forwarding cookies, using HTTP proxy.
- **2024-04-15**: Reader now supports image reading! It captions all images at the specified URL and adds `Image [idx]: [caption]` as an alt tag (if they initially lack one). This enables downstream LLMs to interact with the images in reasoning, summarizing etc. [See example here](https://x.com/JinaAI_/status/1780094402071023926).

## Usage

### Using `r.jina.ai` for single URL fetching

Simply prepend `https://r.jina.ai/` to any URL. For example, to convert the URL `https://en.wikipedia.org/wiki/Artificial_intelligence` to an LLM-friendly input, use the following URL:

[https://r.jina.ai/https://en.wikipedia.org/wiki/Artificial_intelligence](https://r.jina.ai/https://en.wikipedia.org/wiki/Artificial_intelligence)

### Rate Limits

| Reader API | `https://r.jina.ai` | Convert URL to LLM-friendly text | 20 RPM | 200 RPM | 1000 RPM | 4.6s | Count the number of tokens in the output response. | GET/POST |
| ---------- | ------------------- | -------------------------------- | ------ | ------- | -------- | ---- | -------------------------------------------------- | -------- |
