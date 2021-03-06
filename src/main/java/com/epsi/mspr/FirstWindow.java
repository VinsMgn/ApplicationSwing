package com.epsi.mspr;
import java.awt.EventQueue;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.UIManager;
import javax.swing.plaf.nimbus.*;

public class FirstWindow implements ActionListener {

	private JFrame frame;
	private JButton btnPush = new JButton("Push me");
	private JButton btnClick = new JButton("Click me");
	

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					FirstWindow window = new FirstWindow();
					UIManager.setLookAndFeel(new NimbusLookAndFeel());
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
	
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		if(e.getSource() == btnClick) {
			System.out.println("Button clicked");
		} else {
			System.out.println("Other button clicked");
		}
	}
	
	/**
	 * Create the application.
	 */
	public FirstWindow() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setSize(600,400);
		frame.setTitle("Client Recycl");
		frame.setLocationRelativeTo(null);
		frame.setVisible(true);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		
		JPanel contentPane = (JPanel)frame.getContentPane();
		contentPane.setLayout(new FlowLayout());
		
		this.btnPush.addActionListener(this);
		contentPane.add(btnPush);

		this.btnClick.addActionListener(this);
		contentPane.add(btnClick);

		contentPane.add(new JCheckBox("Check me"));
		contentPane.add(new JTextField("Edit me"));
		
	}

}
