import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen, Play } from 'lucide-react';

export default function ArticlesPage() {
  const articles = [
    {
      title: "Why Your CRE Firm Needs NotebookLM",
      description: "Google's NotebookLM is a game-changing AI tool for CRE pros, turning dense documents into private, actionable insights, without compromising sensitive deal data.",
      date: "November 19, 2025",
      author: "Jonathan Buckelew",
      image: "https://cdn.credaily.com/uploads/2025/11/Copy-of-Article-Images-1.webp",
      url: "https://www.credaily.com/briefs/why-your-cre-firm-needs-notebooklm/",
      publication: "CRE Daily"
    },
    {
      title: "Gemini or Copilot? Choosing the Right AI for CRE",
      description: "CRE firms are turning to Google's Gemini and Microsoft's Copilot to speed up underwriting, automate reporting, and close deals faster.",
      date: "October 20, 2025",
      author: "Jonathan Buckelew",
      image: "https://cdn.credaily.com/uploads/2025/10/Copy-of-Article-Images-21.webp",
      url: "https://www.credaily.com/briefs/gemini-or-copilot-choosing-the-right-ai-for-cre/",
      publication: "CRE Daily"
    },
    {
      title: "Top 5 Must-Have AI Tools for CRE",
      description: "AI is reshaping CRE by cutting manual work and sharpening decisions. Here are 5 tools every professional should know.",
      date: "September 3, 2025",
      author: "Jonathan Buckelew",
      image: "https://cdn.credaily.com/uploads/2025/09/Review-Solo-01-png.webp",
      url: "https://www.credaily.com/briefs/top-5-must-have-ai-tools-for-cre/",
      publication: "CRE Daily"
    }
  ];

  const videos = [
    {
      title: "AI in Commercial Real Estate",
      description: "Learn how AI is transforming the commercial real estate industry.",
      youtubeId: "D9fRrm4Jt00"
    },
    {
      title: "CRE AI Studio Overview",
      description: "Discover what you'll learn inside the CRE AI Studio.",
      youtubeId: "Y18M6NAYGds"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-6">
              INSIGHTS & RESOURCES
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-yellow-300 to-green-400 bg-clip-text text-transparent">
              Articles & Videos
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Expert insights on leveraging AI in commercial real estate. Stay ahead with our latest articles and video tutorials.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Featured Articles</h2>
            </div>
            <p className="text-gray-600 text-lg">
              Our latest articles published on CRE Daily covering AI tools and strategies for commercial real estate.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {article.publication}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-500 mb-2">{article.date} • By {article.author}</p>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all"
                      onClick={() => window.open(article.url, '_blank')}
                    >
                      Read Article
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Play className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Video Tutorials</h2>
            </div>
            <p className="text-gray-600 text-lg">
              Watch our video content to learn AI strategies for CRE. More videos coming soon!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <div className="relative aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {video.title}
                    </h3>
                    <p className="text-gray-600">
                      {video.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white"
          >
            <h3 className="text-2xl font-bold mb-2">More Content Coming Soon!</h3>
            <p className="text-blue-100 mb-4">
              Join the CRE AI Studio to get access to exclusive video lessons, tutorials, and live Q&A sessions.
            </p>
            <Button
              onClick={() => window.location.href = '/FreeTrialPayment'}
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
            >
              Start Your Free Trial
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}