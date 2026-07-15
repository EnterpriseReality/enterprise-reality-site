# ER-WEB-005 Diagram Library Governance

## Purpose

This directory will govern diagrams used by the Enterprise Reality Website Engineering Handbook. No diagrams are created during Milestone 1.

## Naming Convention

Diagram source files should use:

```text
ER-WEB-005-DIAGRAM-<chapter-number>-<short-name>.<source-extension>
```

Exports should preserve the same stem and add the export format extension.

## Canonical Source and Export Formats

The editable source file is canonical. Exported SVG, PNG or other rendered files are derived artefacts and must not become a separate source of truth.

Preferred source formats, where approved for the chapter, are:

- Mermaid for text-governed diagrams;
- SVG for carefully reviewed vector diagrams;
- Draw.io files for diagrams that require visual editing.

## Accessibility Requirements

Every diagram must have a text alternative sufficient to understand the diagram without seeing the image. Diagrams must not rely on colour alone and must remain legible at publication sizes.

## Alternative Text Requirements

Each chapter reference to a diagram must provide concise alternative text and, where needed, a longer explanation in prose near the diagram.

## Diagram Versioning

Diagram source changes must follow the chapter review lifecycle. Material diagram changes require review because they can change meaning.

## Reuse and Duplication Rules

Reuse an existing canonical diagram source when the same meaning is required. Do not duplicate diagrams by copying exports into multiple chapter folders. Derived exports must be regenerated from the canonical source.

## Chapter-Reference Rules

Chapters must reference diagrams by stable relative paths and explain the diagram in surrounding text. A diagram must not introduce architecture that is absent from approved governing publications or reviewed chapter text.
