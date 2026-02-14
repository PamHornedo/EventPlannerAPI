import { Request, Response } from "express";
import { Event } from "../models/Event";

// Create new event
export const createEvent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err: any) {
    res
      .status(400)
      .json({ message: "Error creating event", error: err.message });
  }
};

// Get all events
export const getAllEvents = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { category, date } = req.query;
    const filter: any = {};

    if (category) {
      filter.category = category;
    }
    if (date) {
      filter.date = { $gte: new Date(date as string) };
    }

    const events = await Event.find(filter);
    res.json({ count: events.length, events });
  } catch (err: any) {
    res
      .status(400)
      .json({ message: "Error fetching events", error: err.message });
  }
};

// Get an event by ID
export const getEventById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    res.json({ event });
  } catch (err: any) {
    res
      .status(400)
      .json({ message: "Error fetching event", error: err.message });
  }
};

// Update an event by ID
export const updateEvent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedEvent) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    res.json(updatedEvent);
  } catch (err: any) {
    res
      .status(400)
      .json({ message: "Error updating event", error: err.message });
  }
};

// Delete an event by ID
export const deleteEvent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    res.json({ message: "Event deleted successfully" });
  } catch (err: any) {
    res
      .status(400)
      .json({ message: "Error deleting event", error: err.message });
  }
};
