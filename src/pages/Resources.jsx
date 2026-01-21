import React, { useState, useEffect } from "react";
import { Resource } from "@/entities/Resource";
import { PdfPurchase } from "@/entities/PdfPurchase";
import { User } from "@/entities/User";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Filter, Users } from "lucide-react";
import { motion } from "framer-motion";
import ResourceCard from "../components/resources/ResourceCard";
import MemberLogin from "../components/resources/MemberLogin";
import PromptLibrary from "../components/resources/PromptLibrary";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMemberLogin, setShowMemberLogin] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [userPurchases, setUserPurchases] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Add CRE AI Primer manually
      const aiPrimer = {
        id: 'ai-primer',
        title: "CRE AI Primer",
        description: "Quick guide to using our AI favorite tools in Commercial Real Estate, use case examples, shortcuts and our favorite Youtube accounts and courses",
        price: 50, // Updated price from 29 to 50
        category: "general",
        preview_image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/3b66a5b12_image.png"
      };
      
      setResources([aiPrimer]);

      // Check if user is logged in
      try {
        const currentUser = await User.me();
        setUser(currentUser);
        
        // Load user's purchases if logged in
        const purchases = await PdfPurchase.filter({ user_email: currentUser.email });
        setUserPurchases(purchases);
      } catch (error) {
        // User not logged in
        setUser(null);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isMember = user && user.is_circle_member;
  
  const hasAccessToResource = (resource) => {
    if (isMember) return true;
    return userPurchases.some(purchase => purchase.resource_id === resource.id);
  };

  const handleMemberLogin = () => {
    setShowMemberLogin(true);
  };

  const handlePurchase = async (resource) => {
    // For AI Primer, redirect to stripe payment link
    if (resource.id === 'ai-primer') {
      window.location.href = 'https://buy.stripe.com/8x214oecvf1sbpf8rscV203';
    } else if (resource.stripe_payment_link) {
      window.location.href = resource.stripe_payment_link;
    } else {
      alert("Payment link not available for this resource");
    }
  };

  const handleDownload = async (resource) => {
    // For members, this would download the AI Primer
    if (resource.id === 'ai-primer') {
      alert("Download link for AI Primer will be available for members");
      return; // Prevent further action for the primer
    }

    // Record the free download for members
    if (isMember && user) {
      try {
        await PdfPurchase.create({
          resource_id: resource.id,
          user_email: user.email,
          purchase_type: "member_free"
        });
      } catch (error) {
        // Ignore if already recorded
      }
    }
    
    // Open PDF in new tab
    window.open(resource.pdf_url, '_blank');
  };

  const filteredResources = resources.filter(resource => 
    categoryFilter === "all" || resource.category === categoryFilter
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading resources...</p>
        </div>
      </div>
    );
  }

  if (showMemberLogin) {
    return <MemberLogin onLoginSuccess={loadData} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Prompt Library Section */}
      <PromptLibrary />
      
      {/* PDF Resources Section */}
      <div className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-blue-600 text-white">
            Premium Content
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            CRE AI{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Guides
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Premium PDF guides and templates to accelerate your AI journey in commercial real estate
          </p>

          {/* Access Status */}
          {user ? (
            <div className="flex justify-center">
              {isMember ? (
                <Badge className="bg-green-600 text-white px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  Circle Member - Free Access
                </Badge>
              ) : (
                <div className="text-center">
                  <Badge className="bg-amber-600 text-white px-4 py-2 mb-2">
                    Free for Members, payment required for non-members
                  </Badge>
                  <p className="text-sm text-slate-600">
                    <button 
                      onClick={() => window.location.href = '/Payment'}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Join Circle Community
                    </button>
                    {" "}for free access to all resources
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleMemberLogin}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Users className="mr-2 w-4 h-4" />
                Member Login
              </Button>
              <Button
                onClick={() => window.location.href = '/Payment'}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Join Community
              </Button>
            </div>
          )}
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="automation">Automation</SelectItem>
                <SelectItem value="analysis">Analysis</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                isMember={hasAccessToResource(resource)}
                onPurchase={handlePurchase}
                onDownload={handleDownload}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              No resources available yet
            </h3>
            <p className="text-slate-500">
              Premium resources will be available soon
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}