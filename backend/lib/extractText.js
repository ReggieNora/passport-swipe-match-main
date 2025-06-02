import { promises as fs } from 'fs';
import pdf from 'pdf-parse';

/**
 * Extracts text content from a PDF file
 * @param {string} filePath - Path to the PDF file
 * @returns {Promise<string>} Extracted text content
 * @throws {Error} If file reading or PDF parsing fails
 */
export async function extractResumeText(filePath) {
  try {
    // Read the PDF file
    const dataBuffer = await fs.readFile(filePath);
    
    // Parse the PDF
    const data = await pdf(dataBuffer);
    
    // Return the extracted text
    return data.text;
  } catch (error) {
    // Enhance the error with more context
    const enhancedError = new Error(`Failed to extract text from PDF: ${error.message}`);
    enhancedError.originalError = error;
    enhancedError.filePath = filePath;
    
    // Log the error for debugging
    console.error('PDF Text Extraction Error:', {
      filePath,
      error: error.message,
      stack: error.stack
    });
    
    throw enhancedError;
  }
}

/**
 * Helper function to check if a file is a PDF
 * @param {string} filePath - Path to the file
 * @returns {Promise<boolean>} True if the file is a PDF
 */
export async function isPdfFile(filePath) {
  try {
    // Check file extension
    if (!filePath.toLowerCase().endsWith('.pdf')) {
      return false;
    }
    
    // Check file exists and is readable
    await fs.access(filePath, fs.constants.R_OK);
    
    // Read first few bytes to check PDF magic number
    const fd = await fs.open(filePath, 'r');
    const buffer = Buffer.alloc(5);
    await fd.read(buffer, 0, 5, 0);
    await fd.close();
    
    // Check for PDF magic number (%PDF-)
    return buffer.toString() === '%PDF-';
  } catch (error) {
    return false;
  }
}

export default {
  extractResumeText,
  isPdfFile
};
