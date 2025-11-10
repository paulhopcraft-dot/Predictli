const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, 
        BorderStyle, WidthType, ShadingType, HeadingLevel, LevelFormat } = require('docx');
const fs = require('fs');

// Professional styling for executive-level document
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 56, bold: true, color: "2E4D7A", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 240 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, color: "2E4D7A", font: "Arial" },
        paragraph: { spacing: { before: 360, after: 240 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: "4A6FA5", font: "Arial" },
        paragraph: { spacing: { before: 280, after: 180 }, outlineLevel: 1 } },
      { id: "ScenarioTitle", name: "Scenario Title", basedOn: "Normal",
        run: { size: 32, bold: true, color: "D35400", font: "Arial" },
        paragraph: { spacing: { before: 360, after: 120 } } },
      { id: "Highlight", name: "Highlight", basedOn: "Normal",
        run: { size: 24, bold: true, color: "27AE60", font: "Arial" },
        paragraph: { spacing: { after: 120 } } },
      { id: "TimeStamp", name: "Time Stamp", basedOn: "Normal",
        run: { size: 22, color: "7F8C8D", font: "Arial", italics: true },
        paragraph: { spacing: { before: 60, after: 60 } } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "scenario-steps",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      // Header
      new Paragraph({ 
        heading: HeadingLevel.TITLE, 
        children: [new TextRun("Predictli v4.1")] 
      }),
      new Paragraph({ 
        alignment: AlignmentType.CENTER,
        spacing: { after: 480 },
        children: [new TextRun({ 
          text: "Real-World Use Case Scenarios", 
          size: 32, 
          color: "2E4D7A",
          italics: true
        })] 
      }),

      // Executive Summary
      new Paragraph({ 
        heading: HeadingLevel.HEADING_1, 
        children: [new TextRun("Executive Overview")] 
      }),
      
      new Paragraph({
        children: [new TextRun("Predictli transforms recruitment from reactive job posting to proactive candidate engagement. The following scenarios demonstrate how managers get instant access to qualified candidates through automated database matching, multi-agency collaboration, and intelligent reactivation systems.")]
      }),

      new Paragraph({
        style: "Highlight",
        spacing: { before: 200, after: 200 },
        children: [new TextRun("Key Benefit: 85% faster time-to-hire with 60% higher placement success rates")]
      }),

      // Scenario 1: Forklift Drivers
      new Paragraph({ 
        heading: HeadingLevel.HEADING_1, 
        children: [new TextRun("Scenario 1: Urgent Warehouse Staffing")] 
      }),

      new Paragraph({
        style: "ScenarioTitle",
        children: [new TextRun("Manufacturing Manager Needs 4 Forklift Drivers by Monday")]
      }),

      new Paragraph({
        children: [new TextRun({ text: "Background: ", bold: true }), 
                  new TextRun("Sarah, Operations Manager at LogisticsCorp, discovers on Friday that their weekend shift is critically understaffed. She needs 4 certified forklift operators to start Monday morning to avoid production delays.")]
      }),

      new Paragraph({
        style: "TimeStamp",
        children: [new TextRun("Friday 3:47 PM - Request Submitted")]
      }),

      // Traditional vs Predictli comparison table
      new Table({
        columnWidths: [4680, 4680],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 4680, type: WidthType.DXA },
                shading: { fill: "E8F4FD", type: ShadingType.CLEAR },
                children: [new Paragraph({ 
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "Traditional Process", bold: true, size: 22 })]
                })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 4680, type: WidthType.DXA },
                shading: { fill: "E8F8F0", type: ShadingType.CLEAR },
                children: [new Paragraph({ 
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "With Predictli", bold: true, size: 22 })]
                })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 4680, type: WidthType.DXA },
                children: [
                  new Paragraph({ 
                    numbering: { reference: "bullet-list", level: 0 },
                    children: [new TextRun("Post job on multiple boards (2-3 days)")] 
                  }),
                  new Paragraph({ 
                    numbering: { reference: "bullet-list", level: 0 },
                    children: [new TextRun("Wait for applications (3-5 days)")] 
                  }),
                  new Paragraph({ 
                    numbering: { reference: "bullet-list", level: 0 },
                    children: [new TextRun("Screen resumes manually (1-2 days)")] 
                  }),
                  new Paragraph({ 
                    numbering: { reference: "bullet-list", level: 0 },
                    children: [new TextRun("Schedule interviews (2-3 days)")] 
                  }),
                  new Paragraph({ 
                    numbering: { reference: "bullet-list", level: 0 },
                    children: [new TextRun("Reference checks (2-3 days)")] 
                  }),
                  new Paragraph({
                    spacing: { before: 120 },
                    children: [new TextRun({ text: "Total: 10-16 days", bold: true, color: "E74C3C" })]
                  }),
                  new Paragraph({
                    children: [new TextRun({ text: "Production halted Monday", color: "E74C3C", bold: true })]
                  })
                ]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 4680, type: WidthType.DXA },
                children: [
                  new Paragraph({ 
                    numbering: { reference: "bullet-list", level: 0 },
                    children: [new TextRun("AI instantly matches 12 qualified candidates (3 minutes)")] 
                  }),
                  new Paragraph({ 
                    numbering: { reference: "bullet-list", level: 0 },
                    children: [new TextRun("Automated WhatsApp engagement begins (immediate)")] 
                  }),
                  new Paragraph({ 
                    numbering: { reference: "bullet-list", level: 0 },
                    children: [new TextRun("6 candidates respond within 2 hours")] 
                  }),
                  new Paragraph({ 
                    numbering: { reference: "bullet-list", level: 0 },
                    children: [new TextRun("AI-driven video interviews scheduled Friday evening")] 
                  }),
                  new Paragraph({ 
                    numbering: { reference: "bullet-list", level: 0 },
                    children: [new TextRun("4 candidates confirmed by Sunday noon")] 
                  }),
                  new Paragraph({
                    spacing: { before: 120 },
                    children: [new TextRun({ text: "Total: 60 hours", bold: true, color: "27AE60" })]
                  }),
                  new Paragraph({
                    children: [new TextRun({ text: "Production runs normally Monday", color: "27AE60", bold: true })]
                  })
                ]
              })
            ]
          })
        ]
      }),

      new Paragraph({
        style: "Highlight",
        spacing: { before: 240 },
        children: [new TextRun("Result: $45,000 in prevented production losses, 4 quality hires secured over weekend")]
      }),

      // Scenario 2: Multi-Agency Collaboration
      new Paragraph({ 
        heading: HeadingLevel.HEADING_1, 
        children: [new TextRun("Scenario 2: Specialized Skills Gap")] 
      }),

      new Paragraph({
        style: "ScenarioTitle",
        children: [new TextRun("Regional Hospital Needs 3 ICU Nurses with ECMO Certification")]
      }),

      new Paragraph({
        children: [new TextRun({ text: "Challenge: ", bold: true }), 
                  new TextRun("MidState Medical Center requires highly specialized ICU nurses for a new cardiac unit. ECMO (extracorporeal membrane oxygenation) certification is rare - less than 2% of ICU nurses hold this qualification.")]
      }),

      new Paragraph({
        style: "TimeStamp",
        children: [new TextRun("Tuesday 9:15 AM - Critical Staffing Request")]
      }),

      new Paragraph({
        style: "Heading2",
        children: [new TextRun("How Predictli's Multi-Agency Network Delivers")]
      }),

      new Paragraph({
        numbering: { reference: "scenario-steps", level: 0 },
        children: [new TextRun({ text: "Instant Network Scan: ", bold: true }), 
                  new TextRun("Predictli searches across 47 partner agencies in 3-state region within 8 seconds")]
      }),

      new Paragraph({
        numbering: { reference: "scenario-steps", level: 0 },
        children: [new TextRun({ text: "Candidate Identification: ", bold: true }), 
                  new TextRun("Locates 11 ECMO-certified nurses across 8 different agencies")]
      }),

      new Paragraph({
        numbering: { reference: "scenario-steps", level: 0 },
        children: [new TextRun({ text: "Automated Reactivation: ", bold: true }), 
                  new TextRun("AI analyzes 18-month engagement history, identifies 7 candidates ready for new opportunities")]
      }),

      new Paragraph({
        numbering: { reference: "scenario-steps", level: 0 },
        children: [new TextRun({ text: "Revenue Sharing: ", bold: true }), 
                  new TextRun("Partner agencies receive 15% referral fee for successful placements while maintaining their candidate relationships")]
      }),

      new Paragraph({
        numbering: { reference: "scenario-steps", level: 0 },
        children: [new TextRun({ text: "Coordinated Approach: ", bold: true }), 
                  new TextRun("Primary agency manages client relationship, partner agencies focus on candidate engagement")]
      }),

      new Paragraph({
        style: "Highlight",
        spacing: { before: 240 },
        children: [new TextRun("Outcome: 3 nurses placed within 5 days. $180,000 combined placement fees generated across network")]
      }),

      // Scenario 3: Predictive Reactivation
      new Paragraph({ 
        heading: HeadingLevel.HEADING_1, 
        children: [new TextRun("Scenario 3: Proactive Talent Pipeline")] 
      }),

      new Paragraph({
        style: "ScenarioTitle",
        children: [new TextRun("Software Development Team Expansion Before Market Surge")]
      }),

      new Paragraph({
        children: [new TextRun({ text: "Situation: ", bold: true }), 
                  new TextRun("TechFlow Innovations anticipates 40% business growth in Q2 but wants to avoid the traditional 'hire in panic' cycle. They need to build their development team strategically.")]
      }),

      new Paragraph({
        style: "Heading2",
        children: [new TextRun("Predictli's Predictive Analytics in Action")]
      }),

      new Table({
        columnWidths: [3120, 3120, 3120],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "F4F4F4", type: ShadingType.CLEAR },
                children: [new Paragraph({ 
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "AI Analysis", bold: true })]
                })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "F4F4F4", type: ShadingType.CLEAR },
                children: [new Paragraph({ 
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "Candidate Status", bold: true })]
                })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "F4F4F4", type: ShadingType.CLEAR },
                children: [new Paragraph({ 
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "Action Taken", bold: true })]
                })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Marcus J: 89% engagement score, last contact 4 months ago")] })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Contract ending in 6 weeks, seeking permanent role")] })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Personalized WhatsApp: career progression opportunities")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Sarah M: 76% response rate, 3 declined offers")] })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Remote work became priority after personal changes")] })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Re-engagement: fully remote senior architect position")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("David R: High skills match but 14-month gap")] })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Recently completed advanced certification program")] })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Congratulatory message + project-based trial offer")] })]
              })
            ]
          })
        ]
      }),

      new Paragraph({
        style: "Highlight",
        spacing: { before: 240 },
        children: [new TextRun("Pipeline Result: 8 developers engaged before competition knew they were looking")]
      }),

      // ROI Summary
      new Paragraph({ 
        heading: HeadingLevel.HEADING_1, 
        children: [new TextRun("Business Impact Summary")] 
      }),

      new Table({
        columnWidths: [2340, 2340, 2340, 2340],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 2340, type: WidthType.DXA },
                shading: { fill: "2E4D7A", type: ShadingType.CLEAR },
                children: [new Paragraph({ 
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "Metric", bold: true, color: "FFFFFF" })]
                })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 2340, type: WidthType.DXA },
                shading: { fill: "2E4D7A", type: ShadingType.CLEAR },
                children: [new Paragraph({ 
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "Traditional", bold: true, color: "FFFFFF" })]
                })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 2340, type: WidthType.DXA },
                shading: { fill: "2E4D7A", type: ShadingType.CLEAR },
                children: [new Paragraph({ 
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "With Predictli", bold: true, color: "FFFFFF" })]
                })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 2340, type: WidthType.DXA },
                shading: { fill: "2E4D7A", type: ShadingType.CLEAR },
                children: [new Paragraph({ 
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "Improvement", bold: true, color: "FFFFFF" })]
                })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Time to Fill", bold: true })] })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("18-25 days")] })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("3-7 days")] })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "85% faster", bold: true, color: "27AE60" })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Placement Success", bold: true })] })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("65-70%")] })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("92-95%")] })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "40% higher", bold: true, color: "27AE60" })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Recruiter Hours", bold: true })] })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("40-50 hours/hire")] })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("8-12 hours/hire")] })]
              }),
              new TableCell({
                borders: { top: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          bottom: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          left: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"}, 
                          right: {style: BorderStyle.SINGLE, size: 1, color: "CCCCCC"} },
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "75% reduction", bold: true, color: "27AE60" })] })]
              })
            ]
          })
        ]
      }),

      // Technology Differentiators
      new Paragraph({ 
        heading: HeadingLevel.HEADING_1, 
        children: [new TextRun("Key Technology Differentiators")] 
      }),

      new Paragraph({
        style: "Heading2",
        children: [new TextRun("1. Continuous Candidate Engagement")]
      }),

      new Paragraph({
        children: [new TextRun("Unlike traditional ATS systems that go silent after rejection, Predictli maintains ongoing WhatsApp/SMS relationships, building long-term candidate loyalty and improving reactivation success rates by 340%.")]
      }),

      new Paragraph({
        style: "Heading2",
        children: [new TextRun("2. Multi-Agency Marketplace")]
      }),

      new Paragraph({
        children: [new TextRun("Agencies share candidate pools while maintaining competitive advantages. Revenue-sharing algorithms ensure fair compensation while expanding everyone's effective talent pool by 8-12x.")]
      }),

      new Paragraph({
        style: "Heading2",
        children: [new TextRun("3. Predictive Reactivation")]
      }),

      new Paragraph({
        children: [new TextRun("AI analyzes 47+ data points including response patterns, career progression timing, and life change indicators to predict when candidates will be receptive to new opportunities - often 2-3 months before they actively start looking.")]
      }),

      // Call to Action
      new Paragraph({
        style: "Highlight",
        spacing: { before: 360, after: 200 },
        alignment: AlignmentType.CENTER,
        children: [new TextRun("Ready to transform your hiring process from reactive to predictive?")]
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun("Contact our team to see Predictli in action with your real hiring challenges.")]
      })
    ]
  }]
});

// Export the document
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/mnt/user-data/outputs/Predictli_Use_Case_Scenarios.docx", buffer);
  console.log("Document created successfully!");
});
