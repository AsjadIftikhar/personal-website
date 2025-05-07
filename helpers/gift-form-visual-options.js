import React from "react";
import { FaChild, FaUserGraduate, FaUserTie, FaUserNurse, FaUserFriends, FaUserSecret, FaUserAstronaut, FaHeart, FaUserAlt, FaUser } from "react-icons/fa";

// Age avatars (could be replaced by images for more fun)
export const ageOptions = [
  { label: "Child", value: "child", icon: <FaChild /> },
  { label: "Teen", value: "teen", icon: <FaUserGraduate /> },
  { label: "Adult", value: "adult", icon: <FaUserTie /> },
  { label: "Senior", value: "senior", icon: <FaUserNurse /> },
];

export const genderOptions = [
  { label: "Male", value: "male", icon: <FaUser /> },
  { label: "Female", value: "female", icon: <FaUserAlt /> },
  { label: "Other", value: "other", icon: <FaUserAstronaut /> },
  { label: "Any", value: "any", icon: <FaUserSecret /> },
];

export const budgetOptions = [
  { label: "$", value: "under-25", icon: "💵" },
  { label: "$$", value: "25-50", icon: "💸" },
  { label: "$$$", value: "50-100", icon: "🤑" },
  { label: "$$$$", value: "100+", icon: "💰" },
];

export const relationshipOptions = [
  { label: "Friend", value: "friend", icon: <FaUserFriends /> },
  { label: "Partner", value: "partner", icon: <FaHeart /> },
  { label: "Sibling", value: "sibling", icon: <FaUserGraduate /> },
  { label: "Parent", value: "parent", icon: <FaUserNurse /> },
  { label: "Other", value: "other", icon: <FaUserSecret /> },
];

export const interestOptions = [
  { label: "Sports", value: "sports", icon: "🏀" },
  { label: "Music", value: "music", icon: "🎵" },
  { label: "Tech", value: "tech", icon: "💻" },
  { label: "Outdoors", value: "outdoors", icon: "🌲" },
  { label: "Books", value: "books", icon: "📚" },
  { label: "Art", value: "art", icon: "🎨" },
  { label: "Cooking", value: "cooking", icon: "🍳" },
  { label: "Travel", value: "travel", icon: "✈️" },
  { label: "Gaming", value: "gaming", icon: "🎮" },
  { label: "Other", value: "other", icon: "✨" },
];
