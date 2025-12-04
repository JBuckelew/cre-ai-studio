import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function ResourceCard({ resource, isMember, onPurchase, onDownload }) {
  const categoryColors = {
    automation: "bg-blue-100 text-blue-800",
    analysis: "bg-green-100 text-green-800",
    marketing: "bg-purple-100 text-purple-800",
    legal: "bg-red-100 text-red-800",
    general: "bg-gray-100 text-gray-800"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 group">
        <CardHeader>
          {resource.preview_image && (
            <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
              <img
                src={resource.preview_image}
                alt={resource.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-xl font-bold text-slate-900 flex-1">
              {resource.title}
            </CardTitle>
            <Badge className={categoryColors[resource.category]}>
              {resource.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col">
          <p className="text-slate-600 leading-relaxed mb-6">
            {resource.description}
          </p>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-500">PDF Guide</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">
                  ${resource.price}
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => onPurchase(resource)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Purchase Now
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}